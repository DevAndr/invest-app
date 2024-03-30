import {ReactNode} from 'react';
import '../syles/layouts.scss'

type AuthLayoutProps = {
    children: ReactNode
}
export default function AuthLayout({children}: AuthLayoutProps) {

    return (
        <>
            <main className='auth-layout'>
                {children}
            </main>
        </>
    );
}