'use client';

import { FormEvent, createContext } from 'react';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { AppartmentDataType, HouseDataType, PropertyDataType } from 'kotilogi-app/dataAccess/types';

export const PropertyFormContext = createContext<{
  property?: Partial<AppartmentDataType | HouseDataType>;
  propertyTypes: TODO;
  buildingTypes: TODO;
  energyClasses: TODO;
  buildingMaterials: TODO;
  yardOwnershipTypes: TODO;
  roofMaterials: TODO;
  roofTypes: TODO;
  heatingTypes: any[];
  mainColors: TODO;
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
