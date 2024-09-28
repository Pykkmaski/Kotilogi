'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import React from 'react';

type EventProviderProps = {
  event?: TODO;
  additionalData?: any[];
  propertyId: string;
};

const EventContext = React.createContext<EventProviderProps | null>(null);

export function EventProvider({
  children,
  event,
  propertyId,
  additionalData,
}: EventProviderProps & React.PropsWithChildren) {
  return (
    <EventContext.Provider value={{ event, propertyId, additionalData }}>
      {children}
    </EventContext.Provider>
  );
}

export const useEventContext = createUseContextHook('EventContext', EventContext);
