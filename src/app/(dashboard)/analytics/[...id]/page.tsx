'use client'

import React from 'react';
import {useTitlePage} from "@/providers/TitleAppBar";

interface PageAnalyticsProps {
    params: {
        id: string
    }
}

export default function PageAnalytics({params}: PageAnalyticsProps) {
    useTitlePage("Аналитика")

    return (
        <div className='m-6'>
            <div>Analytics</div>
            <p>{params.id}</p>
            <p className='mt-4 text-small'>This page are for analytics </p>
        </div>
    );
}