'use client';

import {Button, Card, CardBody, CardFooter, CardHeader, Divider, Link} from '@nextui-org/react';
import React, {FC} from 'react';
import {Image} from "@nextui-org/react";
import {Post} from '@/types';
import {MdFavorite} from 'react-icons/md';
import CounterBtn from '@/components/Button/CounterBtn';
import {FaComment} from 'react-icons/fa6';
import './styles.scss';
import LikedBtn from '@/components/Button/LikedBtn';

interface PostCardProps {
    data: Post;
}

const PostCard: FC<PostCardProps> = ({data}) => {
    const goToDetailsHandler = () => {
        console.log('goToDetailsHandler');
    };

    return (
        <Card isPressable className="card post">
            <CardHeader className="flex gap-3">
                <Image
                    alt="nextui logo"
                    height={40}

                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md">{data.title}</p>
                    <p className="text-small text-default-500">nextui.org</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p>{data.description}</p>
            </CardBody>
            <Divider/>
            <CardFooter className="footer">
                <div className="actions">
                    <LikedBtn count={43}/>
                    <CounterBtn icon={<FaComment/>} title={43} oncClick={goToDetailsHandler}/>
                </div>
            </CardFooter>
        </Card>
    );
};

export default PostCard;