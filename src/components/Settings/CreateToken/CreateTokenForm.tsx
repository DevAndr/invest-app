import React, {FC, useRef, useState} from 'react';
import {Button, Select, SelectItem} from '@nextui-org/react';
import InputPassword from '@/components/Input/InputPassword';
import {SiJsonwebtokens} from 'react-icons/si';
import './styles.scss';
import {Platform, TokenPlatform} from '@/types';
import {KeyValueItem} from '@/components/types';
import SubmitBtn from '@/components/Button/SubmitBtn';
import {Input} from '@nextui-org/input';
import * as Yup from 'yup';
import {useMutation} from '@apollo/client';
import {CREATE_TOKEN_PLATFORM} from '@/graphql/gql';
import {CreateTokenPlatformArgs, ResponseCreateTokenPlatform, VariablesCreateTokenPlatform} from '@/graphql/types';
import {DateUtils} from '@/utils/DateUtils';
import {useFormik} from 'formik';
const tokenSchema = Yup.object({
    token: Yup.string().required('Заполните поле'),
    expireAt: Yup.date().required('Заполните поле').min(new Date(), 'Дата должна быть больше текущней').nonNullable('Заполните поле'),
    platform: Yup.string().required('Выбирите платформу')
});

type FormCreateTokenState = {
    token: string,
    expireAt: string,
    platform: string
}

interface CreateTokenFormProps {

}

const CreateTokenForm: FC<CreateTokenFormProps> = ({}) => {
    const formik = useFormik<FormCreateTokenState>({
        initialValues: {
            token: '',
            platform: '',
            expireAt: ''
        },
        initialErrors: {
            token: '',
            platform: '',
            expireAt: ''
        },
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        validationSchema: tokenSchema,
        onSubmit: async values => {
            await createToken(values);
        },
    });
    const [fetchCreateToken, {
        data,
        loading: isLoading,
        error
    }] = useMutation<ResponseCreateTokenPlatform, VariablesCreateTokenPlatform>(CREATE_TOKEN_PLATFORM);
    const tokens: TokenPlatform[] = [
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

    function createToken(values: FormCreateTokenState) {
        const platform = values.platform;
        const token = values.token;
        const expireAt = values.expireAt;

        fetchCreateToken({
            variables: {
                data: {
                    token: token,
                    expireAt: DateUtils.formatDate(new Date(expireAt)),
                    platform: platform
                }
            }
        }).then(res => {
            console.log(res);
            formik.resetForm();
        });
    }

    return (
        <form className="create-token-form" onSubmit={formik.handleSubmit}>
            <Select
                label={'Платформа'}
                name="platform"
                value={formik.values.platform}
                onChange={formik.handleChange}
                errorMessage={formik.errors.platform}
                items={platforms}
                placeholder="Выбирите платформу"
                className="max-w-xs">
                {(platform) => <SelectItem key={platform.key}>{platform.value}</SelectItem>}
            </Select>
            <InputPassword icon={<SiJsonwebtokens/>} error={formik.errors.token} label="Токен" name="token"
                           placeholder="Введите токен" value={formik.values.token} onChange={formik.handleChange}/>
            <Input name="expireAt" type={'date'} label="Срок действия токена" className="max-w-xs"
                   errorMessage={formik.errors.expireAt} value={formik.values.expireAt} onChange={formik.handleChange}/>
            <SubmitBtn/>
        </form>
    );
};

export default CreateTokenForm;