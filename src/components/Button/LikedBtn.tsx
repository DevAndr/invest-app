'use client';

import React, {FC, useState} from 'react';
import {Button} from '@nextui-org/react';
import {MdFavorite} from 'react-icons/md';

interface LikedBtnProps {
    count: number;
    initialLiked?: boolean;
    oncClick?: () => void;
}

const LikedBtn: FC<LikedBtnProps> = ({count = 0, initialLiked = false, oncClick}) => {
    const [isLiked, setIsLiked] = useState(initialLiked);

    return (
        <span className="btn-counter">
            <label className="label" style={{color: isLiked ? '#ffe8bd' : '#fff'}}>{count}</label>
            <Button
                onClick={() => {
                    oncClick && oncClick();
                    setIsLiked(!isLiked);
                }}
                isIconOnly
                color={isLiked ? 'danger' : 'default'}
                radius="full"
                variant="light">
               <MdFavorite/>
            </Button>
        </span>
    );
};

export default LikedBtn;