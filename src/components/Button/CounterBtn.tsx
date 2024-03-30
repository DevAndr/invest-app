'use client';

import React, {FC} from 'react';
import {Button} from '@nextui-org/react';
import {MdFavorite} from 'react-icons/md';
import './styles.scss';

interface CounterBtnProps {
    title: number;
    oncClick?: () => void;
    icon: React.ReactNode;
}

const CounterBtn: FC<CounterBtnProps> = ({title = '', icon, oncClick}) => {
    return (
        <span className="btn-counter">
            <label className="label">{title}</label>
            <Button
                onClick={() => {
                    oncClick && oncClick();
                }}
                isIconOnly
                color={'default'}
                radius="full"
                variant="light">
               {icon}
            </Button>
        </span>
    );
};

export default CounterBtn;