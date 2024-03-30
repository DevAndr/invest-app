import {gql} from "@apollo/client";

export const GET_POSTS = gql`
    query Posts {
        posts {
            description
            id
            title
        }
    }`

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
}`

export const CHECK_AUTH = gql`
    query Query {
  checkAuth
}`