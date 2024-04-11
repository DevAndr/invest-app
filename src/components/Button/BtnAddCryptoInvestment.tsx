'use client';

import React, {FC, useState} from 'react';
import {
    Button, Checkbox,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select, SelectItem,
    useDisclosure
} from '@nextui-org/react';
import './styles.scss';
import {Input} from '@nextui-org/input';
import {KeyValueItem} from '@/components/types';
import {CryptoStrategy, Platform, TypeCurrency} from '@/types';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import SubmitBtn from '@/components/Button/SubmitBtn';
import {DateUtils} from '@/utils/DateUtils';
import {useMutation} from '@apollo/client';
import {ResponseCreateTokenPlatform, VariablesCreateTokenPlatform} from '@/graphql/types';
import {CREATE_CRYPTO_INVESTMENT, CREATE_TOKEN_PLATFORM} from '@/graphql/gql';

const createInvestSchema = Yup.object<FormCreateInvestState>({
    amountInvest: Yup.string().required('Заполните поле'),
    goal: Yup.string().required('Заполните поле'),
    platform: Yup.string().required('Выбирите платформу').nonNullable(),
    symbol: Yup.string().required('Заполните поле'),
    orderDate: Yup.string().required('Выбирите дату'),
    typeCurrency: Yup.string().required('Выбирите валюту').nonNullable(),
    strategy: Yup.string().required('Выбирите стратегию').nonNullable(),
});

type FormCreateInvestState = {
    amountInvest: string,
    goal: string,
    platform: string
    symbol: string
    orderDate: string
    strategy: string
    typeCurrency: string
}

const BtnAddCryptoInvestment: FC = () => {
    const [fetchCreateToken, {
        data,
        loading: isLoading,
        error
    }] = useMutation<ResponseCreateTokenPlatform, VariablesCreateTokenPlatform>(CREATE_CRYPTO_INVESTMENT);
    const formik = useFormik<FormCreateInvestState>({
        initialValues: {
            amountInvest: '',
            goal: '',
            platform: 'BYBIT',
            symbol: '',
            orderDate: DateUtils.currentDate(),
            strategy: 'SPOT',
            typeCurrency: 'USD'
        },
        initialErrors: {
            amountInvest: '',
            goal: '',
            platform: '',
            symbol: '',
            orderDate: '',
            strategy: '',
            typeCurrency: ''
        },
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        validationSchema: createInvestSchema,
        onSubmit: async values => {
            console.log(values);
        },
    });
    const [isCurDate, setIsCurDate] = useState<boolean>(true);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const platforms: KeyValueItem[] = Object.values(Platform).map(p => ({key: p, value: p}));
    const strategies: KeyValueItem[] = Object.values(CryptoStrategy).map(p => ({key: p, value: p}));
    const currencies: KeyValueItem[] = Object.values(TypeCurrency).map(p => ({key: p, value: p}));

    const openDialogHandler = () => {
        onOpen();
    }

    return (
       <>
           <Button className="btn create-crypto" color="primary" variant="shadow" onClick={openDialogHandler}>
               Добавить
           </Button>
           <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
               <ModalContent>
                   {(onClose) => (
                       <form onSubmit={formik.handleSubmit}>
                           <ModalHeader className="flex flex-col gap-1">Записать сделку</ModalHeader>
                           <ModalBody>
                               <Input
                                   name="symbol"
                                   value={formik.values.symbol}
                                   onChange={formik.handleChange}
                                   errorMessage={formik.errors.symbol}
                                   placeholder="Введите котировку"
                                   labelPlacement="outside"
                               />
                               <Input
                                   name='amountInvest'
                                   value={formik.values.amountInvest}
                                   onChange={formik.handleChange}
                                   errorMessage={formik.errors.amountInvest}
                                   type="number"
                                   placeholder="Депозит"
                                   labelPlacement="outside"
                               />
                               <Input
                                   name='goal'
                                   value={formik.values.goal}
                                   onChange={formik.handleChange}
                                   errorMessage={formik.errors.goal}
                                   type="number"
                                   placeholder="Цель"
                                   labelPlacement="outside"
                               />
                               <Select
                                   name="platform"
                                   value={formik.values.platform}
                                   onChange={formik.handleChange}
                                   defaultSelectedKeys={[formik.values.platform]}
                                   errorMessage={formik.errors.platform}
                                   items={platforms}
                                   placeholder="Выбирите платформу">
                                   {(platform) => <SelectItem key={platform.key}>{platform.value}</SelectItem>}
                               </Select>
                               <Select
                                   name="strategy"
                                   value={formik.values.strategy}
                                   defaultSelectedKeys={[formik.values.strategy]}
                                   onChange={formik.handleChange}
                                   errorMessage={formik.errors.strategy}
                                   items={strategies}
                                   placeholder="Выбирите стратегию">
                                   {(strategy) => <SelectItem key={strategy.key}>{strategy.value}</SelectItem>}
                               </Select>
                               <Select
                                   name="typeCurrency"
                                   defaultSelectedKeys={[formik.values.typeCurrency]}
                                   value={formik.values.typeCurrency}
                                   onChange={formik.handleChange}
                                   errorMessage={formik.errors.typeCurrency}
                                   items={currencies}
                                   placeholder="Выбирите валюту">
                                   {(curency) => <SelectItem key={curency.key}>{curency.value}</SelectItem>}
                               </Select>
                               <Checkbox isSelected={isCurDate} onValueChange={setIsCurDate}>Дата текущая</Checkbox>
                               {
                                   !isCurDate &&
                                       <Input
                                           name="orderDate"
                                           type="date"
                                           value={formik.values.orderDate}
                                           onChange={formik.handleChange}
                                           errorMessage={formik.errors.orderDate}
                                           placeholder="Дата"
                                           labelPlacement="outside"
                                       />
                               }
                           </ModalBody>
                           <ModalFooter>
                               <Button color="danger" variant="light" onPress={onClose}>
                                   Отмена
                               </Button>
                               <SubmitBtn/>
                           </ModalFooter>
                       </form>
                   )}
               </ModalContent>
           </Modal>
       </>
    );
};

export default BtnAddCryptoInvestment;