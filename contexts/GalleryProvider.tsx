"use client";
import {createContext, useContext, useEffect, useState} from 'react';

export type ItemType = {
    id: string | number,
    title: string,
    description?: string,
}

export type SelectedStates = 'selected' | 'deselected';

export type SelectedItemsType = {
    [key: number] : SelectedStates,
}

export type ProviderValueType = {
    selectedItems: number[],
    toggleSelected: (id: number) => void,
}

const GalleryContext = createContext({} as ProviderValueType);

export function useGallery(){
    return useContext(GalleryContext);
}

export default function GalleryProvider({children}){
    /**
     * Provides item selection functionality to galleries wrapped inside.
     */

    const [selectedItems, setSelectedItems] = useState([] as number[]);

    function toggleSelected(id: number){
        const newSelected = [...selectedItems];
        if(newSelected.includes(id)){
            newSelected.splice(newSelected.indexOf(id), 1);
        }
        else{
            newSelected.push(id);
        }
        
        setSelectedItems(newSelected);
    }

    const contextValue: ProviderValueType = {
        selectedItems,
        toggleSelected,
    }

    return (
        <GalleryContext.Provider value={contextValue}>
            {children}
        </GalleryContext.Provider>
    )
}