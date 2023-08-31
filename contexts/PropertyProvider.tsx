import React, { createContext, useContext, PropsWithChildren } from "react";
import { Property } from "kotilogi-app/types/Property";

interface PropertyProviderProps{
    property: Property,
}

const PropertyContext = createContext(null as {property: Property} | null);

export default function PropertyProvider(props: PropsWithChildren<PropertyProviderProps>){
    
    const contextValue = {
        property: props.property,
    }

    return (
        <PropertyContext.Provider value={contextValue}>
            {props.children}
        </PropertyContext.Provider>
    );
}

export function usePropertyProvider(){
    const context: {property: Property} | null = useContext(PropertyContext);
    if(!context) throw new Error('Property context: Property cannot be null!');

    return useContext(PropertyContext);
}