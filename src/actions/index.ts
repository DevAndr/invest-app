'use server';

import instanceAxios from '@/axios/InstanceAxios';
import {cookies} from 'next/headers';
import {Post} from '@/types';
import apolloClient from '@/graphql/ApolloClient';
import {GET_POSTS} from '@/graphql/gql';
import {FormCreatePostState} from '@/components/dialog/CreatePostDialog';


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

export async function createCreatePostAction(prevState: any, formData: FormData) {

    const rawFormData = {
        title: formData.get('title'),
        description: formData.get('description'),
    }

    console.log(rawFormData, prevState);

    return await new Promise(resolve => setTimeout(() => resolve({
        ...rawFormData,
        message: {
            title: 'Введите название поста',
            description: ''
        },
        isDone: false
    }), 1000))


}