'use client';

import React, {FC, useState} from 'react';
import './styles.scss';
import {InvestmentStatus} from '@/types';
import {Chip} from '@nextui-org/chip';

interface FilterCryptoInvestProps {

}

type FilterIvest = InvestmentStatus | 'all'

type FilterCryptoInvest = {
    label: string
    value: InvestmentStatus | 'all'
    color: string
}

const Filters: FilterCryptoInvest[] = [
    {
        label: 'Все',
        value: 'all',
        color: 'primary'
    },
    {
        label: 'В процессе',
        value: InvestmentStatus.OPEN,
        color: 'warning'
    },
    {
        label: 'Завершенные',
        value: InvestmentStatus.COMPLETED,
        color: 'success'
    },
    {
        label: 'Отмененные',
        value: InvestmentStatus.CANCELLED,
        color: 'danger'
    }
];

const FilterCryptoInvest: FC<FilterCryptoInvestProps> = ({}) => {
    const [current, setCurrent] = useState<FilterIvest>('all');

    const Counter: FC = () => {
        return (
            <span className={`text-white font-semibold mr-2`}>43</span>
        );
    };

    const handleChange = (value: FilterIvest) => {

        setCurrent(value);
    };



    return (
        <div className="filter crypto-invest">
            {
                Filters.map((filter) => (
                    <Chip className='chip' key={filter.value} color={filter.color} variant={current === filter.value ? 'solid' : 'flat'}
                          endContent={<Counter/>} onClick={handleChange.bind(null, filter.value)}>
                        {filter.label}
                    </Chip>
                ))
            }
        </div>
    );
};

export default FilterCryptoInvest;