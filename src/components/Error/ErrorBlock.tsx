import React, {FC} from 'react';
import './styles.scss'
interface ErrorBlockProps {
error?: any;
}

const ErrorBlock: FC<ErrorBlockProps> = ({error}) => {
    if (!error) return null

    return (
        <div className='error-block'>
            <p>{error}</p>
        </div>
    );
};

export default ErrorBlock;