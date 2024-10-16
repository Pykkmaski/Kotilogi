import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { useQuery } from '@tanstack/react-query';
import { getViemariPutketAsennusTavat } from '../actions';
import { useEventFormContext } from '../../EventFormContext';

export const ViemariPutketEventContent = () => {
  const { extraData } = useEventFormContext();
  const { data, isLoading } = useQuery({
    queryKey: ['viemariputket-toteutustapa'],
    queryFn: async () => getViemariPutketAsennusTavat(),
  });
  return (
    <SuspenseFormControl
      isLoading={isLoading}
      loadingText='Ladataan toteutustapoja...'
      label='Toteutustapa'
      required
      control={
        <ChipRadioGroup
          name='toteutusTapaId'
          dataArray={!isLoading ? data : []}
          labelKey='label'
          valueKey='id'
          currentValue={extraData.toteutusTapaId}
        />
      }
    />
  );
};
