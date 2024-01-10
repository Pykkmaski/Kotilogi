'use client';

import { createContext } from "react";

type DataPageContextProps = React.PropsWithChildren & {
    data: unknown,
}

const DataPageContext = createContext<DataPageContextProps | null>(null);

export function DataPageContextProvider({children, ...props}: DataPageContextProps){
    return (
        <DataPageContext.Provider value={props}>
            {children}
        </DataPageContext.Provider>
    );
}

type ArrayData

