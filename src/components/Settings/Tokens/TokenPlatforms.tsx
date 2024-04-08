import React, {FC, ReactNode} from 'react';
import './styles.scss';
import {SiJsonwebtokens} from 'react-icons/si';
import {Platform, TokenPlatform} from '@/types';
import TokenInput from '@/components/Input/TokenInput';
import {KeyValueItem} from '@/components/types';
import CreateTokenForm from '@/components/Settings/CreateToken/CreateTokenForm';


const TokenPlatforms: FC = () => {
    const tokesns: TokenPlatform[] = [
        {
            id: '1',
            token: 'sdfdsf09d8f0dfu98dfg',
            expireAt: new Date('2021-09-09T12:30:00.000Z'),
            platform: Platform.BYBIT
        },
        {
            id: '2',
            token: 'rtyh56h56h56h56h6',
            expireAt: new Date('2021-09-09T12:30:00.000Z'),
            platform: Platform.TINKOFF
        }
    ];
    const platforms: KeyValueItem[] = Object.values(Platform).map(p => ({key: p, value: p}));

    const ListTokens: FC = () => {
        const nodes: ReactNode[] = [];

        if (tokesns.length) {
            tokesns.forEach((token) => {
                nodes.push(
                    <div className="token" key={token.id}>
                        <TokenInput data={token} icon={<SiJsonwebtokens/>} placeholder="Введите токен"/>
                    </div>
                );
            });
        }

        return (
            <div className="tokens-settings list">
                {nodes}
            </div>
        );
    };

    return (
        <div className="tokens-settings">
            <h3>Токены торговых платформ</h3>
            <ListTokens/>
            <CreateTokenForm/>
        </div>
    );
};

export default TokenPlatforms;