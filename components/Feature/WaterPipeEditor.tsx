import { EditorContainer } from './EditorContainer';
import { RadioSelector } from './OptionSelector';

export function WaterPipeEditor({ waterPipeData, onChange }) {
  return (
    <EditorContainer>
      <h1 className='font-semibold'>Käyttövesiputkien tiedot</h1>
      <RadioSelector
        label='Asennustapa'
        labelKey='label'
        valueKey='label'
        tablename='restoration_events.water_pipe_installation_method_type'
        name='installation_method'
        value={waterPipeData.installation_method}
        onChange={onChange}
      />
    </EditorContainer>
  );
}
