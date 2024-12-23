import { OptionSelector } from './OptionSelector';

function InsulationMaterialSelector(props: Kotidok.SelectorProps) {
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

function InsulationTargetSelector(props: Kotidok.SelectorProps) {
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

export function Insulation({ data, index = 0, onChange }) {
  return (
    <div className='flex flex-col gap-2'>
      <InsulationMaterialSelector
        value={data.insulation_material_id}
        onChange={onChange}
      />
      <InsulationTargetSelector
        value={data.insulation_target_id}
        onChange={onChange}
      />
    </div>
  );
}

export function InsulationEditor({ insulationData, onChange }) {
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='font-semibold'>Eristyksen tiedot</h1>
      <Insulation
        data={insulationData}
        onChange={onChange}
      />
    </div>
  );
}
