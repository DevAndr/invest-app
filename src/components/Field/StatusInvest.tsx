import React, {FC, useMemo} from 'react';
import {InvestmentStatus} from '@/types';
import './styles.scss';
import {CheckIcon} from '@nextui-org/shared-icons';
import {Chip} from '@nextui-org/chip';
import {FaRegCircleCheck, FaRegCircleDot, FaRegCircleXmark} from 'react-icons/fa6';

interface StatusInvestProps {
    status: InvestmentStatus;
}

type LocalDataField = {
    label: string;
    color: "warning" | "success" | "default" | "primary" | "secondary" | "danger" | undefined;
    icon: React.ReactNode;
}

const StatusInvest: FC<StatusInvestProps> = ({status}) => {
    console.log(status);
    const localData: LocalDataField = useMemo(() => {
        switch (status) {
            case InvestmentStatus.OPEN:
                return {
                    label: 'Открыто',
                    color: 'warning',
                    icon: <FaRegCircleDot  />
                };
            case InvestmentStatus.COMPLETED:
                return {
                    label: 'Выполнено',
                    color: 'success',
                    icon: <FaRegCircleCheck />
                };
            case InvestmentStatus.CANCELLED:
                return {
                    label: 'Отменено',
                    color: 'danger',
                    icon: <FaRegCircleXmark />
                };
            default:
                return status;
        }
    }, [status]);

    return (
        <div className="field status-invest">
            <Chip startContent={localData.icon} size='sm'
                  variant="flat"
                  color={localData.color}>
                {localData.label}
            </Chip>
        </div>
    );
};

export default StatusInvest;