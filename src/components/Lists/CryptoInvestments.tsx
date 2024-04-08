'use client'

import React, {FC, useEffect} from 'react';
import './styles.scss'
import {useLazyQuery} from '@apollo/client';
import {GET_ALL_CRYPTO_INVESTMENTS} from '@/graphql/gql';
import CryptoCard from '@/components/Card/CryptoCard';
import {ResponseAllCryptoInvestments} from '@/graphql/types';

interface CryptoInvestmentsProps {

}

const CryptoInvestments: FC<CryptoInvestmentsProps> = ({}) => {
    const [getAllCryptoInvestments, { loading, error, data }] =
        useLazyQuery<ResponseAllCryptoInvestments>(GET_ALL_CRYPTO_INVESTMENTS);

    useEffect(() => {
        getAllCryptoInvestments();
    }, [])

    return (
        <ul className='list crypto'>
            {
                data?.getAllCryptoInvestments.map((cryptoInvest) => (
                    <li key={cryptoInvest.id}>
                        <CryptoCard data={cryptoInvest}/>
                    </li>
                ))
            }
        </ul>
    );
};

export default CryptoInvestments;