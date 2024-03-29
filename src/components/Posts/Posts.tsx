'use client'

import React, {FC} from 'react';
import {useQuery} from "@apollo/client";
import {GET_POSTS} from "@/graphql/graphql";


interface PostsProps {

}

const Posts: FC<PostsProps> = () => {
    const { loading, error, data } = useQuery(GET_POSTS);
    return (
        <>
            {
                loading ? <div>Loading</div> :
                    error ? <div>Error</div> :
                        data.posts.map((post: any) => <div key={post.id}>{post.title}</div>)
            }
        </>
    );
}

export default Posts;