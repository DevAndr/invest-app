'use server';

import instanceAxios from '@/axios/InstanceAxios';
import {cookies} from 'next/headers';
import {Post, Tag} from '@/types';
import apolloClient from '@/graphql/ApolloClient';
import {GET_POSTS} from '@/graphql/gql';
import {FormCreatePostState} from '@/components/Dialog/CreatePostDialog';


export async function getMyPosts(): Promise<Post[]> {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken');
    console.log('getMyPosts', accessToken);
    // const res = await instanceAxios.post<Post[]>('http://localhost:3030/graphql', {
    //     query: `query Posts {
    //     posts {
    //         description
    //         id
    //         title
    //     }
    // }`
    // });
    // return res.data?.data?.posts;
    const data = await apolloClient.query({query: GET_POSTS});
    console.log(data);
    // const res = await fetch('http://localhost:3030/graphql', {
    //         credentials: 'include',
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             // 'Authorization': `Bearer ${accessToken}`
    //         },
    //         body: JSON.stringify({
    //             query: `query Posts {
    //             posts {
    //                 description
    //                 id
    //                 title
    //             }
    //         }`
    //         })
    //     }
    // );
    //
    // res.json().then(res => console.log(res));
    return [];
}

export async function hasAccessToken() {
    return !!cookies().get('accessToken');
}

export type CreateCreatePostActionProps = {
    title: string
    description: string
    files: string[],
    tags: Tag[]
}

export async function createCreatePostAction(data: CreateCreatePostActionProps) {
    console.log(data);

}