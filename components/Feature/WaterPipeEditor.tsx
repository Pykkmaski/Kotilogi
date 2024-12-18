import { OptionSelector } from './OptionSelector';

export function WaterPipeEditor({ waterPipeData, onChange }) {
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='font-semibold'>Käyttövesiputkien tiedot</h1>
      <OptionSelector
        label='Asennustapa'
        labelKey='label'
        valueKey='id'
        tablename='water_pipe.installation_method'
        name='installation_method_id'
        value={waterPipeData.installation_method_id}
        onChange={onChange}
      />
    </div>
  );
}
