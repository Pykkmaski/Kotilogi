'use client';

import { createContext, useContext } from "react"
import { usePageWithData } from "./PageWithData.hooks";
import { ActionType, StateType } from "./PageWithData.reducer";

type PageWithDataContextProps = React.PropsWithChildren & {
    state: StateType,
    dispatch: React.Dispatch<ActionType>,
}

export const PageWithDataContext = createContext<PageWithDataContextProps | null>(null);

type PageWithDataWrapperProps = React.PropsWithChildren & {
    data: any[],
}

/**Client-side wrapper to be rendered in server page components that fetch data. Accepts the fetched data as props.
 * Creates a state and dispatch function, exposed to it's children via
 * the PageWithDataContext, and accessed inside the children with the usePageWithData-hook.
 * */ 
export function PageWithDataWrapper({children, data}: PageWithDataWrapperProps){
    const {state, dispatch} = usePageWithData(data);
    return (
        <PageWithDataContext.Provider value={{
            state, dispatch
        }}>
            {children}
        </PageWithDataContext.Provider>
    )
}

export function usePageWithDataContext(){
    const context = useContext(PageWithDataContext);
    if(!context) throw new Error('usePageWithDataContext must be used within the scope of a PageWithDataContext!');
    return context;
}