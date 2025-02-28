'use client';

import { createContext } from 'react';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import { usePropertyForm } from './PropertyForm.hooks';

export const PropertyFormContext = createContext<
  (ReturnType<typeof usePropertyForm> & { property: any; refs: TODO }) | null
>(null);

export const usePropertyFormContext = createUseContextHook(
  'PropertyFormContext',
  PropertyFormContext
);

//export const PropertyForm = forwardRef(Component);
