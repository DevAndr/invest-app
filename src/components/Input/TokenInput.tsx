import React, {FC, ReactNode} from 'react';
import InputPassword from '@/components/Input/InputPassword';
import {TokenPlatform} from '@/types';

interface TokenInputProps {
    data: TokenPlatform;
    placeholder?: string;
    icon?: ReactNode;
    onChange?: (value: string) => void;
}

const TokenInput: FC<TokenInputProps> = ({data, ...props}) => {
    const ExpireAtElement: FC<{ expire: Date }> = ({expire}) => {
        const date = expire.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        return (
            <div className="token-expire-at">Токен истекает {date}</div>
        );
    };

    return (
        <InputPassword {...props} label={data.platform} value={data.token}
                       description={<ExpireAtElement expire={new Date(data.expireAt)}/>}/>
    );
};

export default TokenInput;