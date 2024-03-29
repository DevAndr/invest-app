import {gql} from "@apollo/client";

export const GET_POSTS = gql`
    query Posts {
        posts {
            description
            id
            title
        }
    }`