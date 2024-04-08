import {gql} from "@apollo/client";

export const GET_POSTS = gql`
    query Posts {
        posts {
            description
            id
            title
        }
    }`;

export const REFRESH_TOKEN = gql`
    mutation RefreshTokens {
  refreshTokens {
    accessToken
    refreshToken
  }
}`;

export const SIG_IN = gql`
    mutation SigIn($data: LogInInput!) {
  sigIn(data: $data) {
    accessToken
    refreshToken
  }
}`;

export const CHECK_AUTH = gql`
    query Query {
  checkAuth
}`;

export const FIND_OR_CREATE_TAG = gql`
    mutation Mutation($value: String!) {
  findOrCreateTag(value: $value) {
    id
    value
  }
}`;


export const FIND_PARTIAL_TAGS = gql`
mutation FindPartialTags($value: String!) {
  findPartialTags(value: $value) {
    id
    value
  }
}`

export const CREATE_TAG = gql`
    mutation CreateTag {
    createTag(value: $value) {
        id
        value
    }
}`

export const GET_ALL_CRYPTO_INVESTMENTS = gql`
    query {
        getAllCryptoInvestments {
            amountInvest
            coin {
                id
                symbol
            }
            createAt
            currentAmount
            goal
            id
            orderDate
            platform
            profit
            status
            strategy
            updateAt
        }
    } 
`

export const CREATE_TOKEN_PLATFORM = gql`
    mutation CreateTokenPlatform($data: CreateTokenPlatform!) {
        createTokenPlatform(data: $data) {
            expireAt
            id
            platform
            token
        }
    }
`