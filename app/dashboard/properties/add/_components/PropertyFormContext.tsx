'use client';

import { createContext } from 'react';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import { AppartmentDataType, HouseDataType } from 'kotilogi-app/dataAccess/types';

export const PropertyFormContext = createContext<{
  property?: Partial<AppartmentDataType | HouseDataType>;
  refs: any;

  isValid: boolean;
  resetData: (data?: any) => void;

  updatePropertyInfo: (data: TODO, valid: boolean) => void;
} | null>(null);

/*
function Component(
  { onChange, onSubmit, id, property }: SubmitFormProps,
  ref: React.Ref<HTMLFormElement>
) {
  return (
    <form
      ref={ref}
      id={id}
      className={style.container}
      onChange={onChange}
      onSubmit={async (e: TODO) => {
        onSubmit(e).then(() => e.target.reset());
      }}>
      <PropertyFormContext.Provider value={{ property }}>
        <TargetTypeField />
        <GeneralField />
        <ExteriorField />
        <YardField />
        <InteriorField />

        <HeatingField />
        <OtherInfoField />
      </PropertyFormContext.Provider>
    </form>
  );
}
  */

export const usePropertyFormContext = createUseContextHook(
  'PropertyFormContext',
  PropertyFormContext
);

//export const PropertyForm = forwardRef(Component);
