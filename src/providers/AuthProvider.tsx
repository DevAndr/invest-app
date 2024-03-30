'use client';
import {ReactNode, createContext, useState, useContext} from 'react';
import {useQuery} from '@apollo/client';
import {CHECK_AUTH} from '@/graphql/gql';
import {ResponseCheckAuth} from '@/graphql/types';

type AuthContextType = {
    isAuth: boolean;
}

const initial: AuthContextType = {
    isAuth: true,
};

const AuthContext = createContext<AuthContextType>(initial);

type AuthProviderProps = {
    children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
    const {data, loading} = useQuery<ResponseCheckAuth>(CHECK_AUTH);
    // const [data, setData] =
    //     useState<AuthContextType>({isAuth: !!getCookie('accessToken')});
    return (
        <AuthContext.Provider value={{isAuth: loading ? false : !!data?.checkAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}