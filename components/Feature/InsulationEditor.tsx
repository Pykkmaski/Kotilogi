import { OptionSelector } from './OptionSelector';

export function InsulationMaterialSelector(props: Kotidok.SelectorProps) {
  return (
    <OptionSelector
      {...props}
      name='insulation_material_id'
      label='Eristemateriaali'
      tablename='insulation.materials'
      labelKey='label'
      valueKey='id'
    />
  );
}

export function InsulationTargetSelector(props: Kotidok.SelectorProps) {
  return (
    <OptionSelector
      {...props}
      name='insulation_target_id'
      label='Eristyskohde'
      tablename='insulation.targets'
      labelKey='label'
      valueKey='id'
    />
  );
}

export function InsulationEditor({ insulationData, onChange }) {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='font-semibold'>Eristyksen tiedot</h1>
      <InsulationMaterialSelector
        value={insulationData.insulation_material_id}
        onChange={onChange}
      />
      <InsulationTargetSelector
        value={insulationData.insulation_target_id}
        onChange={onChange}
      />
    </div>
  );
}
