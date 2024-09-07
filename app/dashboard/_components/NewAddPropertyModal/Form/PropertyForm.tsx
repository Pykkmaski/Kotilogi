'use client';

import { FormEvent, createContext, forwardRef, useRef } from 'react';
import style from '../style.module.css';
import { TargetTypeField } from './TargetTypeField';
import { GeneralField } from './GeneralField';
import { InteriorField } from './InteriorField';
import { HeatingField } from './HeatingField';
import { OtherInfoField } from './OtherInfoField';
import { YardField } from './YardField';
import { ExteriorField } from './ExteriorField';
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
  heatingTypes: TODO;
  mainColors: TODO;
} | null>(null);

type SubmitFormProps = {
  id: string;
  onChange: (e: TODO) => void;
  onSubmit: (e: FormEvent) => Promise<void>;
  property?: PropertyDataType;
};

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
