'use client';

import {useContext, createContext} from 'react';

type GalleryContextValue = {
    data: any[],
    contentRefId: Kotilogi.IdType,
    loading: boolean,
    addModalContent: JSX.Element,
    deleteModalContent?: JSX.Element,
    addData: (newData: any) => void,
    deleteData: (id: Kotilogi.IdType) => void,
    dispatch: React.Dispatch<any>,
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

type GalleryContextProps = {
    contextValue: GalleryContextValue,
    children: React.ReactNode,
}

export default function GalleryContextProvider(props: GalleryContextProps){
    return (
        <GalleryContext.Provider value={props.contextValue}>
            {props.children}
        </GalleryContext.Provider>
    );
}

export function useGalleryContext(){
    const context = useContext(GalleryContext);
    if(!context) throw new Error('Gallery context cannot be null!');

    return context;
}