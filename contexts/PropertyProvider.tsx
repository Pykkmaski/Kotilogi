"use client";

import React, { createContext, useContext, PropsWithChildren } from "react";
import { PropertyType } from "kotilogi-app/types/PropertyType";

interface PropertyProviderProps{
    property: PropertyType,
    children: React.ReactNode,
}

const PropertyContext = createContext<{property: PropertyType} | null>(null);

export default function PropertyProvider(props: PropertyProviderProps){
    
    const contextValue = {
        property: props.property,
    }

    return (
        <PropertyContext.Provider value={contextValue}>
            {props.children}
        </PropertyContext.Provider>
    );
}

export function usePropertyProvider(): {property: PropertyType}{
    const context: {property: PropertyType} | null = useContext(PropertyContext);
    if(!context) throw new Error('Property context: Property cannot be null!');
    return context;
}