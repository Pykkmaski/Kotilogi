"use client";

import {useContext, createContext} from 'react';

type GalleryWithDeleteContextValue = {
    deleteItem: (id: Kotilogi.IdType) => Promise<void>,
}

export const GalleryWithDeleteContext = createContext<GalleryWithDeleteContextValue | null>(null);

type GalleryWithDeleteContextProps = {
    value: GalleryWithDeleteContextValue,
    children: React.ReactNode,
}

export function GalleryWithDeleteProvider(props: GalleryWithDeleteContextProps){
    return (
        <GalleryWithDeleteContext.Provider value={props.value}>
            {props.children}
        </GalleryWithDeleteContext.Provider>
    )
}

export function useGalleryWithDeleteContext(){
    //This is allowed to possibly be null. Check for null in the component consuming the provider.
    const context = useContext(GalleryWithDeleteContext);
    return context;
}