import { EditorContainer } from './EditorContainer';
import { OptionSelector } from './OptionSelector';

export function SewerPipeEditor({ sewerPipeData, onChange }) {
  return (
    <EditorContainer>
      <h1 className='font-semibold'>Viemäriputkien tiedot</h1>
      <OptionSelector
        label='Toteutustapa'
        labelKey='label'
        valueKey='id'
        tablename='types.sewer_pipe_restoration_method'
        name='restoration_method_type_id'
        value={sewerPipeData.restoration_method_type_id}
        onChange={onChange}
      />
    </EditorContainer>
  );
}
