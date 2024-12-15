import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { useQuery } from '@tanstack/react-query';
import { getKayttovesiAsennusTavat } from '../actions';
import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const KayttoVesiEventContent = () => {
  const { extraData } = useEventFormContext();

  return (
    <OptionSelector
      label='Asennustapa'
      labelKey='label'
      valueKey='id'
      tablename='water_pipe.installation_method'
      propertyName='installation_method_id'
      useContextValue={extraData}
      fetchFn={getKayttovesiAsennusTavat}
    />
  );
};
