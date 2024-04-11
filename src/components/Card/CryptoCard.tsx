import React, {FC} from 'react';
import {Card, CardBody, CardFooter, CardHeader} from '@nextui-org/react';
import './styles.scss';
import {CryptoInvestment} from '@/types';
import {DateUtils} from '@/utils/DateUtils';
import {MdChangeCircle} from 'react-icons/md';
import FieldIconText from '@/components/Field/FieldIconText';
import {BsBoxArrowInDown} from 'react-icons/bs';
import {HiArrowDownTray} from 'react-icons/hi2';
import {GrCurrency} from 'react-icons/gr';
import PlatformField from '@/components/Field/PlatformField';
import StatusInvest from '@/components/Field/StatusInvest';
import FieldTypeStrategy from '@/components/Field/FieldTypeStrategy';
import {NumberFormat} from '@/utils/NumberFormat';

interface CryptoCardProps {
    data: CryptoInvestment;
}

const CryptoCard: FC<CryptoCardProps> = ({data}) => {
    const classNameProfit: string = data.profit > 0 ? ' plus' : data.profit < 0  ? ' minus' : '';

    return (
        <Card isPressable className="card crypto">
            <CardHeader className="head">
                <div className="left">
                    <div className={`symbol${classNameProfit}`}>{data.coin?.symbol}</div>
                    <div className="created">{DateUtils.formatDate(data.orderDate)}</div>
                </div>
                <div className="right">
                    <StatusInvest status={data.status}/>
                    <div className="updated">
                        <FieldIconText label={DateUtils.formatDate(data.updateAt)} icon={<MdChangeCircle/>}/>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="body">
                <div className="data invest">
                    <div className="value">{(data.amountInvest)}</div>
                    <div className="label">вложено</div>
                </div>
                <div className="data current">
                    <div className="value">{NumberFormat.format(data.currentAmount)}</div>
                    <div className="label">баланс</div>
                </div>
                <div className="data goal">
                    <div className="value">{NumberFormat.format(data.goal)}</div>
                    <div className="label">цель</div>
                </div>
            </CardBody>
            <CardFooter className="footer">
                <div className="profit"><label className="label">Профит:</label>
                    <div className={`value${classNameProfit}`}>{data.profit}</div>
                </div>
                <FieldTypeStrategy strategies={data.strategy}/>
            </CardFooter>
        </Card>
    );
};

export default CryptoCard;