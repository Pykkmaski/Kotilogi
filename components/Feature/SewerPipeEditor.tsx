import { OptionSelector } from './OptionSelector';

export function SewerPipeEditor({ sewerPipeData, onChange }) {
  return (
    <div className='flex flex-col gap-2'>
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
    </div>
  );
}
