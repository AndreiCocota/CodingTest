import {gql} from '@apollo/client';

export const LOAD_POSTS = gql`
    query {
        allPosts (count: 100) {
            id
            title
            createdAt
        }    
    }
`;