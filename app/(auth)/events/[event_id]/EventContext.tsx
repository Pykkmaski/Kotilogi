'use client';

import {useContext, createContext} from 'react';

type EventContextValueType = {
    property: Kotilogi.PropertyType,
    event: Kotilogi.EventType,
}   

const EventContext = createContext<EventContextValueType | null>(null);

export function EventContextProvider(props: React.PropsWithChildren & {contextValue: EventContextValueType}){
    return (
        <EventContext.Provider value={props.contextValue}>
            {props.children}
        </EventContext.Provider>
    );
}

export function useEventContext(){
    const context = useContext(EventContext);
    if(!context) throw new Error('Event context cannot be null!');
    return context;
}