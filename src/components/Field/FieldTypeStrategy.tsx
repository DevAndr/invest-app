import React, {FC, useMemo} from 'react';
import {CryptoStrategy} from '@/types';
import './styles.scss';
import {BsFillGrid3X3GapFill} from 'react-icons/bs';
import {MdCurrencyExchange} from 'react-icons/md';
import {TbChartCandle} from 'react-icons/tb';
import {IoMdTime} from 'react-icons/io';

interface FieldTypeStrategyProps {
    strategies: CryptoStrategy[];
}

type LocalDataField = {
    name: string;
    // color: "warning" | "success" | "default" | "primary" | "secondary" | "danger" | undefined;
    icon: React.ReactNode;
}

const FieldTypeStrategy: FC<FieldTypeStrategyProps> = ({strategies}) => {
    function getDataForStrategy(strategy: CryptoStrategy): LocalDataField {
        switch (strategy) {
            case CryptoStrategy.LONG_INVEST:
                return {
                    icon: <IoMdTime className="icon"/>,
                    name: 'Long-invest'
                };
            case CryptoStrategy.FUTURE:
                return {
                    icon: <TbChartCandle className="icon"/>,
                    name: 'Future'
                };
            case CryptoStrategy.SPOT:
                return {
                    icon: <TbChartCandle className="icon"/>,
                    name: 'Spot'
                };
            case CryptoStrategy.GRID_FIAT:
                return {
                    icon: <BsFillGrid3X3GapFill className="icon"/>,
                    name: 'Grid-fiat'
                };
            case CryptoStrategy.GRID_SPOT:
                return {
                    icon: <BsFillGrid3X3GapFill className="icon"/>,
                    name: 'Grid-spot'
                };
            case CryptoStrategy.P2P:
                return {
                    icon: <MdCurrencyExchange className="icon"/>,
                    name: 'P2P'
                };
            default:
                return {
                    icon: <MdCurrencyExchange className="icon"/>,
                    name: 'Other'
                };
        }
    }

    const elements = useMemo(() => {
        if (strategies.length === 0) {
            return null;
        }

        const result = [];
        const checkLong = strategies.find(s => s === CryptoStrategy.LONG_INVEST);

        if (strategies.length === 1) {
            const data = getDataForStrategy(strategies[0]);
            result.push(<data className="type-strategy">
                {data.icon}
                <span className="name">{data.name}</span>
            </data>);

            return result;
        }

        if (checkLong) {
            const data = getDataForStrategy(CryptoStrategy.LONG_INVEST);
            result.push(<div className="type-strategy">
                <IoMdTime className="icon"/>
            </div>);
        }

        strategies.filter(s => s !== CryptoStrategy.LONG_INVEST).forEach(s => {
            const data = getDataForStrategy(s);
            result.push(<div className="type-strategy">
                {data.icon}
                <span className="name">{data.name}</span>
            </div>);
        });

        return result;
    }, [strategies]);

    return (
        <div className="field strategies">
            {elements}
        </div>
    );
};

export default FieldTypeStrategy;