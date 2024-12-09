'use client';

import { createContext } from 'react';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import {
  AppartmentPayloadType,
  BuildingDataType,
  HousePayloadType,
} from 'kotilogi-app/dataAccess/types';
import { BatchEntryType } from '@/hooks/useBatch';
import { useBatchForm } from '@/hooks/useBatchForm';

export const PropertyFormContext = createContext<{
  property?: Partial<AppartmentPayloadType | HousePayloadType>;
  buildingData?: BuildingDataType;
  currentHeating: TODO;
  refs: any;
  isValid: boolean;
  isNew: boolean;
  heatingBatch: TODO;
  resetData: (data?: any) => void;
  addHeating: <T>(item: T) => void;
  updateHeatingData: (e: any) => void;
  updateHeatingEntry: TODO;

  updatePropertyInfo: (data: TODO, valid: boolean) => void;
} | null>(null);

export const usePropertyFormContext = createUseContextHook(
  'PropertyFormContext',
  PropertyFormContext
);

//export const PropertyForm = forwardRef(Component);
