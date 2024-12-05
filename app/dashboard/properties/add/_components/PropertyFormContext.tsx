'use client';

import { createContext } from 'react';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import { AppartmentDataType, BuildingDataType, HouseDataType } from 'kotilogi-app/dataAccess/types';

export const PropertyFormContext = createContext<{
  property?: Partial<AppartmentDataType | HouseDataType>;
  buildingData?: BuildingDataType;
  refs: any;
  isValid: boolean;
  isNew: boolean;
  resetData: (data?: any) => void;

  updatePropertyInfo: (data: TODO, valid: boolean) => void;
} | null>(null);

export const usePropertyFormContext = createUseContextHook(
  'PropertyFormContext',
  PropertyFormContext
);

//export const PropertyForm = forwardRef(Component);
