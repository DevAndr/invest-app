// 'use client'

import {Rubik} from "next/font/google";
import "./syles/globals.scss";
import {ReactNode} from "react";
import Providers from "@/providers/Providers";

const rubik = Rubik({subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '900'], variable: '--font-rubik'}
);


export default function RootLayout({children}: Readonly<{
    children: ReactNode;
}>) {

    return (
        <html lang="ru" className="dark">
        <body className={rubik.variable}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
