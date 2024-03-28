'use client'

import React, {FC} from 'react';
import {NextUIProvider} from "@nextui-org/react";
import TitleAppBarProvider from "@/providers/TitleAppBar";

interface ProvidersProps {
    children: React.ReactNode
}

const Providers: FC<ProvidersProps> = ({children}) => {
    return (
        <NextUIProvider>
            <TitleAppBarProvider>
                {children}
            </TitleAppBarProvider>
        </NextUIProvider>
    );
}

export default Providers;