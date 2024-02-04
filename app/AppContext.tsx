'use client';

import { createContext, useContext } from "react";

const AppContext = createContext<any>(null);

export function AppContextProvider({children, value}){
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext(){
    const context = useContext(AppContext);
    if(!context) throw new Error('useAppContext must be used within the scope of an AppContext!');
    return context;
}