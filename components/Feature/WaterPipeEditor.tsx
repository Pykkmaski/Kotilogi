import { EditorContainer } from './EditorContainer';
import { OptionSelector } from './OptionSelector';

export function WaterPipeEditor({ waterPipeData, onChange }) {
  return (
    <EditorContainer>
      <h1 className='font-semibold'>Käyttövesiputkien tiedot</h1>
      <OptionSelector
        label='Asennustapa'
        labelKey='label'
        valueKey='id'
        tablename='types.water_pipe_installation_method'
        name='installation_method_id'
        value={waterPipeData.installation_method_id}
        onChange={onChange}
      />
    </EditorContainer>
  );
}
