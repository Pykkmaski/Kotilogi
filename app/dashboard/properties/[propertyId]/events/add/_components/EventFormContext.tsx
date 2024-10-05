'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import React from 'react';

type EventFormProviderProps = {
  /**The main event data. Not including the type-id references. */
  mainData?: TODO;

  /**The ids of the type references. */
  typeData?: {
    mainTypeId: number;
    targetId: number;
    workTypeId: number;
  };

  /**The data pertaining to specific types of events, like those related to windows. */
  extraData?: TODO;

  propertyId: string;
};

const EventContext = React.createContext<EventFormProviderProps | null>(null);

export function EventFormProvider({
  children,
  mainData,
  typeData,
  propertyId,
  extraData,
}: EventFormProviderProps & React.PropsWithChildren) {
  return (
    <EventContext.Provider
      value={{
        mainData,
        typeData,
        propertyId,
        extraData,
      }}>
      {children}
    </EventContext.Provider>
  );
}

export const useEventFormContext = createUseContextHook('EventContext', EventContext);
