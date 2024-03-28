'use client'

import React, {FC} from 'react';
import {Input} from "@nextui-org/input";
import {SiJsonwebtokens} from "react-icons/si";
import {MdAlternateEmail} from "react-icons/md";
import {useTitlePage} from "@/providers/TitleAppBar";

interface PageProps {

}

const Page: FC<PageProps> = () => {
    useTitlePage("Настройки")

    return (
        <>
            <div>
                <h3>Интеграция с Тинькоф инвестиции</h3>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input type="email" label="Токен" placeholder="Введите токен" startContent={<SiJsonwebtokens/>}/>
                    <Input type="email" label="Email" placeholder="Введите email" startContent={<MdAlternateEmail/>}/>
                </div>
            </div>

        </>
    );
}

export default Page;