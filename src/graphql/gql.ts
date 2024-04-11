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
    mutation CreateTag($value: String!) {
        createTag(value: $value) {
            id
            value
        }
    }`