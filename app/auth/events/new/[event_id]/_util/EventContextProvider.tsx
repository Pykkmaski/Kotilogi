'use client';

import { createContext, useContext } from "react";

type ContextValue = {
    event: Kotilogi.PropertyType,
}

const EventContext = createContext<ContextValue | null>(null);

type ContextProps = {
    value: ContextValue,
    children: React.ReactNode,
}

export default function EventContextProvider(props: ContextProps){
    return (
        <EventContext.Provider value={props.value}>
            {props.children}
        </EventContext.Provider>
    );
}

export function useEventContext(){
    const context = useContext(EventContext);
    if(!context) throw new Error('Event context cannot be null!');
    return context;
}