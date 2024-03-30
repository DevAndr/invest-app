import {ApolloClient, GraphQLRequest, InMemoryCache, createHttpLink, split, ApolloLink, HttpLink} from "@apollo/client";
import AuthService from '@/services/AuthService';
import {setContext} from '@apollo/client/link/context';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from "graphql-ws";
import {onError} from '@apollo/client/link/error';
import {REFRESH_TOKEN} from '@/graphql/gql';
import {ResponseRefreshToken} from "./types";
import {deleteCookie} from "cookies-next";
import {getMainDefinition} from '@apollo/client/utilities';
import {IncomingHttpHeaders} from 'node:http';

const HOST_GRAPHQL = process.env.HOST_GRAPQL;
const url = HOST_GRAPHQL ? HOST_GRAPHQL : 'http://localhost:3030/graphql';
const credentialLinkHttp = createHttpLink({
    uri: url,
    credentials: 'include'
});

function isRefreshRequest(operation: GraphQLRequest) {
    return operation.operationName === 'Refresh';
}

const returnTokenDependingOnOperation = (operation: GraphQLRequest): string => {
    console.log('returnTokenDependingOnOperation', operation.operationName);
    const tokens = AuthService.getLocalTokens();
    console.log('returnTokenDependingOnOperation', tokens);
    if (isRefreshRequest(operation))
        return tokens.rt || '';

    return tokens.at || '';
};

const wsLink = typeof window !== "undefined" ? new GraphQLWsLink(
    createClient({
        url: "ws://localhost:3030/graphql",
        lazy: true,
    })
) : null;

const errorLink = onError(({graphQLErrors, response, networkError, forward, operation}) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(async ({message, locations, path, extensions}) => {
                if (extensions.code === "UNAUTHENTICATED") {
                    if (operation.operationName === 'Refresh') return;

                    const updateTokens = await getRefreshToken();
                    forward(operation);
                }

                if (extensions.code === "FORBIDDEN") {
                    //redirect to login page
                    window.location.replace('/auth');
                }

                console.log(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`, extensions);

            }
        );

    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const splitLink = typeof window !== "undefined" && wsLink != null ? split(
    ({query}) => {
        const def = getMainDefinition(query);

        return (
            def.kind === "OperationDefinition" &&
            def.operation === "subscription"
        );
    },
    wsLink,
    errorLink.concat(credentialLinkHttp)
) : errorLink.concat(credentialLinkHttp);


const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
    const enhancedFetch = (url: string | URL | Request, init?: RequestInit) => {

        return fetch(url, {
            ...init,
            headers: {
                ...init?.headers,
                'Access-Control-Allow-Origin': '*',
                Cookie: headers?.cookie ?? '',
            },
        });
    };

    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: ApolloLink.from([
            errorLink,
            new HttpLink({
                uri: url,
                // Make sure that CORS and cookies work
                fetchOptions: {
                    mode: 'cors',
                },
                credentials: 'include',
                fetch: enhancedFetch,
            }),
        ]),
        cache: new InMemoryCache(),
    });
};

const apolloClient = new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
    link: splitLink,
});

const getRefreshToken = async () => {
    try {
        const refreshResolverResponse = await apolloClient.mutate<ResponseRefreshToken, {}>({
            mutation: REFRESH_TOKEN
        });

        return refreshResolverResponse.data?.refresh;
    } catch (e) {
        console.log('getRefreshToken error', e);
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
    }
};
export default apolloClient;