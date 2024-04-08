import React, {FC} from 'react';
import {Platform} from '@/types';
import './styles.scss';
import {Chip} from '@nextui-org/chip';

interface PlatformFieldProps {
    typePlatform: Platform;
}

const PlatformField: FC<PlatformFieldProps> = ({typePlatform}) => {
    const label = () => {
        switch (typePlatform) {
            case Platform.BINANCE:
                return 'Binance';
            case Platform.BYBIT:
                return 'ByBit';
            case Platform.TINKOFF:
                return typePlatform;
        }
    };


    return (<Chip className="field platform" size="sm">{label()}</Chip>);
};

export default PlatformField;