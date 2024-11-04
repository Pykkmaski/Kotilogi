import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const ViemariPutketEventContent = () => {
  const { extraData } = useEventFormContext();

  return (
    <OptionSelector
      label='Toteutustapa'
      labelKey='label'
      valueKey='id'
      tablename='ref_viemariPutketToteutusTapa'
      propertyName='toteutusTapaId'
      useContextValue={extraData}
    />
  );
};
