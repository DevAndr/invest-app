import React, {ChangeEventHandler, FC, ReactNode, useState} from 'react';
import {Input} from '@nextui-org/input';
import {EyeFilledIcon, EyeSlashFilledIcon} from '@nextui-org/shared-icons';
import './styles.scss';

interface InputPasswordProps {
    value?: string;
    label?: string;
    name?: string;
    placeholder?: string;
    icon?: ReactNode;
    description?: ReactNode;
    error?: ReactNode;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const InputPassword: FC<InputPasswordProps> = ({
                                                   value,
                                                   label,
                                                   error,
                                                   name = 'input',
                                                   icon,
                                                   description,
                                                   placeholder,
                                                   onChange
                                               }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Input
            name={name}
            label={label}
            placeholder={placeholder}
            startContent={icon}
            description={description}
            onChange={onChange}
            errorMessage={error}
            endContent={<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                )}
            </button>}
            value={value}
            type={isVisible ? "text" : "password"}
            className="max-w-xs input"
        />
    );
};

export default InputPassword;