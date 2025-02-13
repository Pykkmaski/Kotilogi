import { EditorContainer } from './EditorContainer';
import { CheckboxSelector } from './OptionSelector';

type ElectricalEditorProps = {
  selectedTargets: number[];
  onChange: (id: number) => void;
};
export function ElectricalEditor({ selectedTargets, onChange }: ElectricalEditorProps) {
  return (
    <EditorContainer>
      <h1 className='font-semibold'>Sähkötyön tiedot</h1>
      <CheckboxSelector
        tablename='restoration_events.electricity_restoration_target_type'
        label='Sähkötyön kohteet'
        labelKey='label'
        valueKey='label'
        values={selectedTargets}
        onChange={onChange as TODO}
      />
    </EditorContainer>
  );
}
