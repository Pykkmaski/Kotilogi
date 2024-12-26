import { EditorContainer } from './EditorContainer';
import { OptionSelector } from './OptionSelector';

export function ElectricalTargetSelector(props: Kotidok.SelectorProps) {
  return (
    <OptionSelector
      {...props}
      tablename='electricity.restoration_work_target'
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
