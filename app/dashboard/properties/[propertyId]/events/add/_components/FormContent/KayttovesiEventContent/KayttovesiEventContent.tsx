import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { useQuery } from '@tanstack/react-query';
import { getKayttovesiAsennusTavat } from '../actions';
import { useEventFormContext } from '../../EventFormContext';

export const KayttoVesiEventContent = () => {
  const { extraData } = useEventFormContext();
  const { data, isLoading } = useQuery({
    queryKey: ['kayttovesi-asennustapa'],
    queryFn: async () => getKayttovesiAsennusTavat(),
  });
  return (
    <SuspenseFormControl
      isLoading={isLoading}
      loadingText='Ladataan asennustapoja...'
      label='Asennustapa'
      required
      control={
        <ChipRadioGroup
          name='asennusTapaId'
          dataArray={!isLoading ? data : []}
          labelKey='label'
          valueKey='id'
          currentValue={extraData.asennusTapaId}
        />
      }
    />
  );
};
