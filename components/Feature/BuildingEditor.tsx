'use client';

import { useQuery } from '@tanstack/react-query/build/legacy';
import { getContent } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm/actions';
import { BuildingDataType } from 'kotilogi-app/dataAccess/types';
import { OptionSelector } from './OptionSelector';

export function BuildingMaterialSelector(props: Kotidok.SelectorProps) {
  return (
    <OptionSelector
      {...props}
      labelKey='name'
      valueKey='id'
      label='Rakennusmateriaali'
      name='building_material_id'
      tablename='buildings.materials'
    />
  );
}

export function BuildingTypeSelector(props: Kotidok.SelectorProps) {
  return (
    <OptionSelector
      {...props}
      labelKey='name'
      valueKey='id'
      label='Rakennuksen tyyppi'
      name='building_type_id'
      tablename='buildings.types'
    />
  );
}

export function ColorSelector({
  name = 'color_id',
  ...props
}: Kotidok.SelectorProps & { name?: string }) {
  return (
    <OptionSelector
      {...props}
      labelKey='name'
      valueKey='id'
      label='Väri'
      name={name}
      tablename='public.ref_mainColors'
    />
  );
}

type BuildingEditorProps = {
  buildingData: Partial<BuildingDataType>;
  onChange: (e: any) => void;
};

export function BuildingEditor({ buildingData, onChange }: BuildingEditorProps) {
  return (
    <div className='flex flex-col gap-4'>
      <BuildingTypeSelector
        value={buildingData.building_type_id}
        onChange={onChange}
      />

      <BuildingMaterialSelector
        value={buildingData.building_material_id}
        onChange={onChange}
      />

      <ColorSelector
        value={buildingData.color_id}
        onChange={onChange}
      />
    </div>
  );
}
