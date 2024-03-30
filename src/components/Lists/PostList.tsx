import React, {FC} from 'react';
import './styles.scss';
import {Post} from '@/types';
import PostCard from '@/components/Card/PostCard';

interface PostListProps {
    data: Post[];
}

const PostList: FC<PostListProps> = ({data}) => {
    return (
        <ul className="list">
            {data.map((post) => <li key={post.id}>
                <PostCard data={post}/>
            </li>)}
        </ul>
    );
};

export default PostList;