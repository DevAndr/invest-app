'use client'

import React, {FC} from 'react';
import {NextUIProvider} from "@nextui-org/react";
import TitleAppBarProvider from "@/providers/TitleAppBar";
import {ApolloProvider} from "@apollo/client";
import apolloClient from "@/graphql/ApolloClient";

interface ProvidersProps {
    children: React.ReactNode
}

const Providers: FC<ProvidersProps> = ({children}) => {
    return (
        <NextUIProvider>
            <TitleAppBarProvider>
                <ApolloProvider client={apolloClient}>
                {children}
                </ApolloProvider>
            </TitleAppBarProvider>
        </NextUIProvider>
    );
}

export default Providers;