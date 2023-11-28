'use client';

import {useContext, createContext} from 'react';

type CardContextValue = {
    item: Kotilogi.PropertyType | Kotilogi.EventType,
    contentDbSrc?: Kotilogi.Table,
    showMenu: boolean,
}

const CardContext = createContext<CardContextValue | null>(null);

type CardContextProps = {
    contextValue: CardContextValue,
    children: React.ReactNode,
}

export default function CardContextProvider(props: CardContextProps){
    return (
        <CardContext.Provider value={props.contextValue}>
            {props.children}
        </CardContext.Provider>
    );
}

export function useCardContext(){
    const context = useContext(CardContext);
    if(!context) throw new Error('Card context cannot be null!');

    return context;
}