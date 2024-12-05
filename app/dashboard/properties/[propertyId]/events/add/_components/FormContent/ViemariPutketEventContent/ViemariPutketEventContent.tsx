import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const ViemariPutketEventContent = () => {
  const { extraData } = useEventFormContext();

  return (
    <OptionSelector
      label='Toteutustapa'
      labelKey='label'
      valueKey='id'
      tablename='sewer_pipe.restoration_method_type'
      propertyName='restoration_method_type_id'
      useContextValue={extraData}
    />
  );
};
