'use client';

import { createContext } from 'react';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import {
  AppartmentPayloadType,
  BuildingDataType,
  HousePayloadType,
  PropertyPayloadType,
} from 'kotilogi-app/dataAccess/types';
import { BatchEntryType } from '@/hooks/useBatch';
import { useBatchForm } from '@/hooks/useBatchForm';
import { usePropertyForm } from './PropertyForm.hooks';

export const PropertyFormContext = createContext<
  (ReturnType<typeof usePropertyForm> & { property: PropertyPayloadType; refs: TODO }) | null
>(null);

export const usePropertyFormContext = createUseContextHook(
  'PropertyFormContext',
  PropertyFormContext
);

//export const PropertyForm = forwardRef(Component);
