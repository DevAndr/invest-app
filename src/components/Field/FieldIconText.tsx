import React, {FC} from 'react';
import './styles.scss';

interface FieldIconTextProps {
    label: string | number;
    icon: React.ReactNode;
}

const FieldIconText: FC<Partial<Exclude<HTMLDivElement, 'className'>> & FieldIconTextProps> = ({
                                                                                                   label,
                                                                                                   icon,
                                                                                                   ...props
                                                                                               }) => {
    return (
        <div className={`field icon${props.className ? ` ${props.className}` : ''}`}>
            <div className="icon">{icon}</div>
            <div className="label">{label}</div>
        </div>
    );
};

export default FieldIconText;