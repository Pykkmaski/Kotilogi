"use client";
import {createContext, useContext} from 'react';

type ContextValue = {
    state: any,
    dispatch: React.Dispatch<any>,
}

const ChartSelectorContext = createContext<ContextValue | null>(null);

type Props = {
    contextValue: ContextValue,
    children: React.ReactNode,
}

export default function ChartSelectorProvider(props: Props){
    return (
        <ChartSelectorContext.Provider value={props.contextValue}>
            {props.children}
        </ChartSelectorContext.Provider>
    );
}

export function useChartSelectorContext(){
    const context = useContext(ChartSelectorContext);
    if(!context) throw new Error('ChartSelectorContext cannot be null!');
    return context;
}