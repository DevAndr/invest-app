import React, {FC} from 'react';
import {Button} from '@nextui-org/react';
import {useFormStatus} from 'react-dom';

interface SubmitBtnProps {
    title?: string;
}

const SubmitBtn: FC<SubmitBtnProps> = ({title='Создать'}) => {
    const {pending} = useFormStatus();
    return (
        <Button color="primary" type="submit" isLoading={pending}>
            {title}
        </Button>
    );
};

export default SubmitBtn;