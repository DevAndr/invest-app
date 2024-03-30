'use client';

import {useFormik} from 'formik';
import React, {FC, useState} from 'react';
import * as Yup from 'yup';
import {Input} from '@nextui-org/input';
import './styles.scss';
import {EyeFilledIcon, EyeSlashFilledIcon} from '@nextui-org/shared-icons';
import {Button} from '@nextui-org/react';
import {useMutation} from '@apollo/client';
import {SIG_IN} from '@/graphql/gql';
import ErrorBlock from '@/components/Error/ErrorBlock';
import { useRouter } from 'next/navigation';
import {ITokens, SigInInput, ResponseSigIn, VariablesSigIn} from '@/graphql/types';

interface AuthFormProps {
    type?: 'LOGIN' | 'REG' | 'RESET';
}

const resetPasswordSchema = Yup.object().shape({
    username: Yup.string().required('Логин не должен быть пустым').nullable(),
    password: Yup.string().required('Пароль не должен быть пустым').nullable()
});

const AuthForm: FC<AuthFormProps> = ({type = 'LOGIN'}) => {
    const router = useRouter()
    const [logIn, {data: dataLogIn, loading: isLoadingLogIn, error: errorLogIn}] = useMutation<ResponseSigIn, VariablesSigIn>(SIG_IN);
    const [isVisible, setVisible] = useState(false);
    const [username, setUsername] = useState('');
    const formik = useFormik({
        initialValues: {
            username: 'test',
            password: 'test',
        },
        validationSchema: resetPasswordSchema,
        validateOnChange: true,
        validateOnMount: false,
        isInitialValid: false,
        onSubmit: async values => {
            logIn({
                variables: {
                    data: values
                }
            }).then((resp) => {
                // console.log(dataLogIn?.sigIn);
                router.push('/');
            })
        }
    });

    const header = () => {
        let title = 'Восстановление пароля';

        if (type === 'LOGIN')
            title = 'Вход';

        else if (type === 'REG')
            title = 'Регистрация';

        return (<h3 className="title">{title}</h3>);
    };

    const toggleVisibility = () => setVisible(!isVisible);

    return (
        <div className="auth-form">
            {header()}
            <form onSubmit={formik.handleSubmit} className="form">
                <Input
                    type="text"
                    label="Логин"
                    defaultValue="username"
                    name="username"
                    className="input"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    errorMessage={formik.errors.username}
                />
                <Input
                    label="Пароль"
                    defaultValue="password"
                    name="password"
                    className="input"
                    type={isVisible ? "text" : "password"}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    errorMessage={formik.errors.password}
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                            )}
                        </button>
                    }
                />
                <Button color="primary" type={'submit'} isLoading={isLoadingLogIn}>
                    {
                        type === 'LOGIN' ? 'Войти' : type === 'REG' ? 'Зарегистрироваться' : 'Восстановить'
                    }
                </Button>

                <ErrorBlock error={errorLogIn?.message}/>
            </form>
        </div>
    );
};

export default AuthForm;