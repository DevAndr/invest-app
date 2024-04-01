'use client'

import Posts from "@/components/Posts/Posts";
import {useAuth} from '@/providers/AuthProvider';
import {hasAccessToken} from '@/actions';
import DropDownAttachment from '@/components/DropDownAttachment/DropDownAttachment';
import InputTags from '@/components/Input/InputTags';

export default function Home() {
    const {isAuth} = useAuth()

    console.log( isAuth);
    return (
        <div className='page'>
           <div className="content">
               {/*<Posts/>*/}
              <InputTags onChange={() => {}}/>
               <div style={{color: 'red'}}>
                   {isAuth ? 'Вы вошли' : 'Вы вышли'}
               </div>
           </div>
        </div>
    );
}
