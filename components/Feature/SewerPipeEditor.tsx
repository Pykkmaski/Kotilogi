import { EditorContainer } from './EditorContainer';
import { RadioSelector } from './OptionSelector';

export function SewerPipeEditor({ sewerPipeData, onChange }) {
  return (
    <EditorContainer>
      <h1 className='font-semibold'>Viemäriputkien tiedot</h1>
      <RadioSelector
        label='Toteutustapa'
        labelKey='label'
        valueKey='label'
        tablename='restoration_events.sewer_pipe_restoration_method_type'
        name='restoration_method_type_id'
        value={sewerPipeData.restoration_method_type_id}
        onChange={onChange}
      />
    </EditorContainer>
  );
}
