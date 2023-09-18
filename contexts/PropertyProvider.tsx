"use client";

import React, { createContext, useContext } from "react";

interface PropertyProviderProps{
    property:  Kotilogi.PropertyType,
    children: React.ReactNode,
}

const PropertyContext = createContext<{property: Kotilogi.PropertyType} | null>(null);

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

export function usePropertyProvider(): {property: Kotilogi.PropertyType}{
    const context: {property: Kotilogi.PropertyType} | null = useContext(PropertyContext);
    if(!context) throw new Error('Property context: Property cannot be null!');
    return context;
}