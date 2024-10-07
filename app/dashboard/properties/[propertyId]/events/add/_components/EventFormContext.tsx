'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import React from 'react';

type EventFormProviderProps = {
  status: 'idle' | 'loading' | 'done';
  onSubmit: (e) => void;
  cancel: () => void;
  /**The main event data. Not including the type-id references. */
  mainData?: TODO;
  updateMainData: (e) => void;

  /**The ids of the type references. */
  typeData?: {
    mainTypeId: number;
    targetId: number;
    workTypeId: number;
  };
  updateTypeData: (e) => void;

  /**The data pertaining to specific types of events, like those related to windows. */
  extraData?: TODO;
  updateExtraData: (e) => void;

  propertyId: string;
};

const EventContext = React.createContext<EventFormProviderProps | null>(null);

export function EventFormProvider({
  children,
  cancel,
  status,
  onSubmit,
  mainData,
  updateMainData,
  typeData,
  updateTypeData,
  propertyId,
  extraData,
  updateExtraData,
}: EventFormProviderProps & React.PropsWithChildren) {
  return (
    <EventContext.Provider
      value={{
        status,
        cancel,
        onSubmit,
        mainData,
        updateMainData,
        typeData,
        updateTypeData,
        propertyId,
        extraData,
        updateExtraData,
      }}>
      {children}
    </EventContext.Provider>
  );
}

export const useEventFormContext = createUseContextHook('EventContext', EventContext);
