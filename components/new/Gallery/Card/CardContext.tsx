import { ItemType } from 'kotilogi-app/contexts/GalleryProvider';
import {createContext, useContext} from 'react';

export type CardContextValue = {
    isSelected: boolean,
    item: ItemType,
    dispatch: any,
    setMenuOpen: any,
    menuOpen: boolean,
}

export const CardContext = createContext<CardContextValue | null>(null);

export function useCardContext(){
    const context = useContext(CardContext);
    if(!context) throw new Error('Card context cannot be null!');

    return context;
}
