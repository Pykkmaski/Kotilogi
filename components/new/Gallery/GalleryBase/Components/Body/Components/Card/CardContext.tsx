import {SetStateAction, createContext, useContext} from 'react';

export type CardContextValue = {
    props,
    isSelected: boolean,
    setMenuOpen: any,
    setShowEditModal: React.Dispatch<SetStateAction<boolean>>,
    setShowDeleteModal: React.Dispatch<SetStateAction<boolean>>,
    menuOpen: boolean,
}

export const CardContext = createContext<CardContextValue | null>(null);

export function useCardContext(){
    const context = useContext(CardContext);
    if(!context) throw new Error('Card context cannot be null!');

    return context;
}
