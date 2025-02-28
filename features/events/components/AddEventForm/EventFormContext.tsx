'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import React from 'react';
import { useEventForm } from './hooks/useEventForm';

type EventFormProviderProps = ReturnType<typeof useEventForm> & { propertyId?: string };

const EventContext = React.createContext<EventFormProviderProps | null>(null);

export function EventFormProvider({
  children,
  ...props
}: EventFormProviderProps & React.PropsWithChildren) {
  return (
    <EventContext.Provider
      value={{
        ...props,
      }}>
      {children}
    </EventContext.Provider>
  );
}

export const useEventFormContext = createUseContextHook('EventContext', EventContext);
