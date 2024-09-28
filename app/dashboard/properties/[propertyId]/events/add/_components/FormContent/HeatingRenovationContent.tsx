import { FormControl, Input, NullOption } from '@/components/UI/FormUtils';
import { useQuery } from '@tanstack/react-query';
import { getPreviousHeatingSystem } from '../actions';
import { useEventContext } from '../EventContext';

const OldSystemSelector = () => {
  const { propertyId } = useEventContext();
  const { isLoading, data: oldEntry } = useQuery({
    queryFn: async () => await getPreviousHeatingSystem(propertyId),
    queryKey: ['heatingSystem'],
  });

  return (
    <select name='oldSystem'>
      {isLoading ? (
        <NullOption>Ladataan...</NullOption>
      ) : (
        <>
          <NullOption>Valitse vanha järjestelmä...</NullOption>
          <option value={oldEntry.id}>{oldEntry.brand + ' ' + oldEntry.model}</option>
        </>
      )}
    </select>
  );
};

export const HeatingRenovationContent = () => {
  return (
    <>
      <FormControl
        required
        label='Merkki'
        control={
          <Input
            name='brand'
            placeholder='Anna lämmönjakokeskuksen merkki...'
          />
        }
      />

      <FormControl
        required
        label='Malli'
        control={
          <Input
            name='model'
            placeholder='Anna lämmönjakokeskuksen malli...'
          />
        }
      />
    </>
  );
};
