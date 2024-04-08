'use client'

import React, {FC} from 'react';
import {Input} from "@nextui-org/input";
import {SiJsonwebtokens} from "react-icons/si";
import {MdAlternateEmail} from "react-icons/md";
import {useTitlePage} from "@/providers/TitleAppBar";
import InputPassword from '@/components/Input/InputPassword';
import TokenPlatforms from '@/components/Settings/Tokens/TokenPlatforms';
import TokenInput from '@/components/Input/TokenInput';
import PersonalData from '@/components/Settings/Profile/PersonalData';

interface PageProps {

}

const Page: FC<PageProps> = () => {
    useTitlePage("Настройки")

    return (
        <>
            <PersonalData/>
            <TokenPlatforms/>
        </>
    );
}

export default Page;