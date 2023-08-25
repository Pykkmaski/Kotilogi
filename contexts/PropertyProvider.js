"use client";

import { createContext, useContext, useEffect } from "react";

const PropertyContext = createContext();

export default function PropertyProvider({property, children}){
    
    const contextValue = {
        property
    }

    return (
        <PropertyContext.Provider value={contextValue}>
            {children}
        </PropertyContext.Provider>
    );
}

export function usePropertyProvider(){
    return useContext(PropertyContext);
}