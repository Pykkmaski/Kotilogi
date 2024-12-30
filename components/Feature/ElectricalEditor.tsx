import { EditorContainer } from './EditorContainer';
import { OptionSelector } from './OptionSelector';

export function ElectricalTargetSelector(props: Kotidok.SelectorProps) {
  return (
    <OptionSelector
      {...props}
      tablename='restoration_events.electricity_restoration_target_type'
      label='Työn kohde'
      name='restoration_work_target_id'
      labelKey='label'
      valueKey='id'
    />
  );
}

export function ElectricalEditor({ electricalData, onChange }) {
  return (
    <EditorContainer>
      <h1 className='font-semibold'>Sähkötyön tiedot</h1>
      <ElectricalTargetSelector
        value={electricalData.restoration_work_target_id}
        onChange={onChange}
      />
    </EditorContainer>
  );
}
