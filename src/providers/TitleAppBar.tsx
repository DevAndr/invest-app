import React, {createContext, FC, useContext, useEffect, useState} from 'react';

interface TitleAppBarProps {
    title: string
}


interface ITitleAppBarContext extends TitleAppBarProps {
    setTitle: (title: string) => void
}

const defaultContext: ITitleAppBarContext = {
    title: 'Главная', setTitle: (title) => {}
}

export const TitleAppBarContext = createContext<ITitleAppBarContext>(defaultContext);

export const useTitleAppBar = () => useContext(TitleAppBarContext)
export const useTitlePage = (title: string) => {
    const {setTitle} = useContext(TitleAppBarContext)

    useEffect(() => {
        setTitle(title)
    }, [title])
}

interface TitleAppBarProviderProps {
    children: React.ReactNode
}

const TitleAppBarProvider: FC<TitleAppBarProviderProps> = ({children}) => {
    const [data, setData] = useState<TitleAppBarProps>({
        title: ''
    });

    const setTitle = (title: string) => {
        setData(prev => ({...data, title}))
    }

    return (
        <TitleAppBarContext.Provider value={{...data, setTitle}}>
            {children}
        </TitleAppBarContext.Provider>
    );
}

export default TitleAppBarProvider;