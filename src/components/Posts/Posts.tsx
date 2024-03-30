'use client'

import React, {FC} from 'react';
import {useQuery} from "@apollo/client";
import {GET_POSTS} from "@/graphql/gql";
import {getMyPosts} from '@/actions';
import SearchPost from '@/components/Input/SearchPost';
import PostCard from '@/components/Card/PostCard';
import PostList from '@/components/Lists/PostList';
import {ResponsePosts} from '@/graphql/types';
import {useAuth} from '@/providers/AuthProvider';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from '@nextui-org/react';
import { IoCreateOutline } from 'react-icons/io5';
import './styles.scss'
import CreatePostDialog from '@/components/dialog/CreatePostDialog';

interface PostsProps {

}

const Posts: FC<PostsProps> = () => {
    const {isAuth} = useAuth()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {loading, error, data} = useQuery<ResponsePosts>(GET_POSTS);
    // const data = await getMyPosts();
    return (
        <div className="posts">
            <div className='head'>
                <SearchPost/>
                <Button className='create-post-btn' color="primary" endContent={<IoCreateOutline />} onPress={onOpen}>
                    Создать пост
                </Button>
            </div>
            <PostList data={data?.posts || []}/>
            <CreatePostDialog isOpen={isOpen} onOpenChange={onOpenChange}/>
        </div>
    );
};

export default Posts;