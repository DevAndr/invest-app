'use client'

import React, {FC} from 'react';
import {useTitlePage} from "@/providers/TitleAppBar";


const PageAnalytics: FC = () => {
    useTitlePage("Аналитика")

    return (
        <div className='m-6'>
            <div>Analytics</div>
            <p className='mt-4 text-small'>This page are for analytics </p>
        </div>
    );
}

export default PageAnalytics;