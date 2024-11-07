'use client';

import { BatchEntryType } from '@/hooks/useBatch';
import { StatusType } from '@/hooks/useStatusWithAsyncMethod';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import React from 'react';

type EventFormProviderProps = {
  addEntry: (entry: BatchEntryType<any>) => void;
  removeEntry: (id: string) => void;
  updateEntry: (predicate: TODO, updateFn: TODO) => void;
  entries: BatchEntryType<any>[];
  status: StatusType;
  onSubmit: (e) => void;
  cancel: () => void;
  files: File[];
  removeFile: (name: string) => void;
  /**The main event data. Not including the type-id references. */
  mainData?: TODO;
  updateMainData: (e) => void;
  editing: boolean;
  /**The ids of the type references. */
  typeData?: {
    mainTypeId: number;
    targetId: number;
    workTypeId: number;

    /**In surface renovations, the id of the surface the event pertains to. */
    surfaceId?: number;
  };
  updateTypeData: (e) => void;

  /**The data pertaining to specific types of events, like those related to windows. */
  extraData?: TODO;
  updateExtraData: (e) => void;

  propertyId: string;

  toggleSurfaceId: (id: number) => void;
  selectedSurfaceIds: number[];
};

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
