'use client'

import Posts from "@/components/Posts/Posts";
import {useAuth} from '@/providers/AuthProvider';
import {hasAccessToken} from '@/actions';
import DropDownAttachment from '@/components/DropDownAttachment/DropDownAttachment';

export default function Home() {
    const {isAuth} = useAuth()

    console.log( isAuth);
    return (
        <div className='page'>
           <div className="content">
               <Posts/>
               <DropDownAttachment/>
               <div style={{color: 'red'}}>
                   {isAuth ? 'Вы вошли' : 'Вы вышли'}
               </div>
           </div>
        </div>
    );
}
