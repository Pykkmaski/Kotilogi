"use client";

import { throwErrorIfNull } from "kotilogi-app/utils/throwErrorIfNull";
import { createContext, useContext, useEffect, useState } from "react"

type ClientProviderProps = {
    children: React.ReactNode,
}

type ContextValue = {
    isClient: boolean;
}

const ClientContext = createContext<ContextValue | null>(null);

export default function ClientProvider(props: ClientProviderProps){
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, [])

    const contextValue: ContextValue = {
        isClient,
    }

    return (
        <ClientContext.Provider value={contextValue}>
            {props.children}
        </ClientContext.Provider>
    )
}

export function useClientProvider(){
    const context = useContext(ClientContext);
    if(!context) throw new Error('useClientProvider: context cannot be null!');
    return useContext(ClientContext);
}