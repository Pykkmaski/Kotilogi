import { FormControl, Input, NullOption } from '@/components/UI/FormUtils';
import { useQuery } from '@tanstack/react-query';
import { getPreviousHeatingSystem } from '../actions';
import { useEventFormContext } from '../EventFormContext';
import { ChipButton, RadioGroup } from '@/components/Feature/RadioGroup';
import axios from 'axios';
import Spinner from '@/components/UI/Spinner';
import { Spacer } from '@/components/New/Spacer';
import { Button } from '@/components/New/Button';
import { Add } from '@mui/icons-material';

const OldSystemSelector = () => {
  const { propertyId } = useEventFormContext();
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

const HeatingSystemSelector = () => {
  const { data: heatingSystems, isLoading } = useQuery({
    queryKey: ['heatingSystemTypes'],
    queryFn: async () =>
      await axios.get('/api/protected/properties/heatingTypes').then(res => {
        return res.status == 200 ? res.data : [];
      }),
  });

  return isLoading ? (
    <Spinner
      size='1rem'
      message='Ladataan lämmitysjärjestelmiä...'
    />
  ) : (
    <FormControl
      label='Järjestelmän tyyppi'
      control={
        <RadioGroup name='typeId'>
          {heatingSystems.map((t, i) => {
            return (
              <ChipButton
                label={t.name}
                value={t.id}
                key={`heatingType-${i}`}
              />
            );
          })}
        </RadioGroup>
      }
    />
  );
};

export const HeatingRenovationContent = () => {
  return (
    <>
      <HeatingSystemSelector />
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

      <Spacer
        direction='row'
        alignItems='center'
        justifyItems='end'
        width='full'>
        <Button
          variant='contained'
          type='button'
          startIcon={<Add />}>
          Lisää...jotain
        </Button>
      </Spacer>
    </>
  );
};
