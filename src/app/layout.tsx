// 'use client'

import {Inter} from "next/font/google";
import "./syles/globals.scss";
import {ReactNode} from "react";
import Providers from "@/providers/Providers";

const inter = Inter({subsets: ["latin"]});


export default function RootLayout({children}: Readonly<{
    children: ReactNode;
}>) {

    return (
        <html lang="en" className='dark'>
        <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
