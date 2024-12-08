'use client';

import { createContext } from 'react';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import { AppartmentPayloadType, HousePayloadType } from 'kotilogi-app/dataAccess/types';

const AddPropertyModalContext = createContext<{
  property: AppartmentPayloadType | HousePayloadType;
  updateData: (data: AppartmentPayloadType | HousePayloadType) => void;
} | null>(null);

export const useAddPropertyModalContext = createUseContextHook(
  'AddPropertyModalContext',
  AddPropertyModalContext
);

export function PriceDisclaimer() {
  return (
    <span className='text-slate-500 text-sm'>
      Yksittäisen talon vuosihinta on{' '}
      <span className='text-green-700'>
        9,90€<span className='text-sm text-slate-500'>(+ALV 24%)</span>
      </span>
    </span>
  );
}
