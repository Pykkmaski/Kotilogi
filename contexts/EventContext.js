"use client";

import {createContext, useContext} from 'react';

const EventContext = createContext();

export function useEventContext(){
    return useContext(EventContext);
}

export default function EventContextProvider({event, mainImageId, children}){

    const contextValue = {
        event,
        mainImageId,
    }

    return (
        <EventContext.Provider value={contextValue}>
            {children}
        </EventContext.Provider>
    );
}