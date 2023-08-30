import React, { createContext, useContext, PropsWithChildren } from "react";

interface PropertyType{
    id: number,
}

interface PropertyProviderProps{
    property: PropertyType,
}

const PropertyContext = createContext(null as {property: PropertyType} | null);

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
    return useContext(PropertyContext);
}