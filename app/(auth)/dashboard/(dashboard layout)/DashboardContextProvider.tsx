'use client';

import { createContext, useContext } from "react";

type DashboardContextProviderProps = React.PropsWithChildren & {
    user: {
        email: string,
    },
}

const DashboardContext = createContext<DashboardContextProviderProps | null>(null);

export function DashboardContextProvider({children, user}: DashboardContextProviderProps){
    return (
        <DashboardContext.Provider value={{user}}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboardContext(){
    const context = useContext(DashboardContext);
    if(!context) throw new Error('useDashboardContext must be used within the scope of a DashboardContext!');
    return context;
}

