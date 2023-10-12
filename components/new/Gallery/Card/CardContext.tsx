import {createContext, useContext} from 'react';

export type CardContextValue = {
    isSelected: boolean,
    item: Kotilogi.ItemType,
    dispatch: any,
    setMenuOpen: any,
    menuOpen: boolean,
    dbTableName?: string,
}

export const CardContext = createContext<CardContextValue | null>(null);

export function useCardContext(){
    const context = useContext(CardContext);
    if(!context) throw new Error('Card context cannot be null!');

    return context;
}
