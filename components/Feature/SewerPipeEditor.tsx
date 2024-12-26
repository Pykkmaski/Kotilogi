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
        tablename='sewer_pipe.restoration_method_type'
        name='restoration_method_type_id'
        value={sewerPipeData.restoration_method_type_id}
        onChange={onChange}
      />
    </EditorContainer>
  );
}
