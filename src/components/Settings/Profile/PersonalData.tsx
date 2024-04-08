import React, {FC} from 'react';
import {Input} from '@nextui-org/input';
import {SiJsonwebtokens} from 'react-icons/si';
import {MdAlternateEmail} from 'react-icons/md';
import {FaUserPen} from 'react-icons/fa6';
import {FaUser} from 'react-icons/fa';

interface PersonalDataProps {

}

const PersonalData: FC<PersonalDataProps> = ({}) => {
    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input type="text" label="Username" placeholder="Введите username" startContent={<FaUser/>}/>
            <Input type="email" label="E-mail" placeholder="Введите e-mail" startContent={<MdAlternateEmail/>}/>
        </div>
    );
};

export default PersonalData;