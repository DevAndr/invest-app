'use client'

import React, {FC} from 'react';
import {SearchIcon} from '@nextui-org/shared-icons';
import {Input} from '@nextui-org/react';
import './styles.scss';

interface SearchPostProps {

}

const SearchPost: FC<SearchPostProps> = ({}) => {
    return (
        <div className="wrap-search">
            <Input
                label="Найти новость"
                isClearable
                radius="lg"
                className="search posts"
                placeholder="Введите что-то..."
                startContent={
                    <SearchIcon
                        className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"/>
                }
            />
        </div>
    );
};

export default SearchPost;