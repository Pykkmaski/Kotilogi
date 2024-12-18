import { OptionSelector } from './OptionSelector';

export function SewerPipeEditor({ sewerPipeData, onChange }) {
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='font-semibold'>Viemäriputkien tiedot</h1>
      <OptionSelector
        label='Toteutustapa'
        labelKey='label'
        valueKey='id'
        tablename='ref_viemariPutketToteutusTapa'
        name='toteutusTapaId'
        value={sewerPipeData.toteutusTapaId}
        onChange={onChange}
      />
    </div>
  );
}
