import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../../EventFormContext';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/UI/Spinner';
import { getDrainageDitchMethods } from '../actions';
import { Checkbox } from '@/components/Feature/RadioGroup/Checkbox';
import { ImplementationMethodSelector } from './ImplementationMethodSelector';

export const DrainageDitchEventContent = () => {
  const { extraData } = useEventFormContext();

  return (
    <>
      <ImplementationMethodSelector />
      <FormControl
        label={<>Salaojasepeli (mm)</>}
        control={
          <Input
            name='salaojaSepeli'
            type='number'
            step='0.01'
            min='0'
            value={extraData && extraData.salaojaSepeli}
            placeholder='Anna salaojasepelin raekoko...'
          />
        }
      />

      <FormControl
        label={<>Routaeristys (mm)</>}
        control={
          <Input
            name='routaEristys'
            type='number'
            step='0.01'
            min='0'
            value={extraData && extraData.routaEristys}
            placeholder='Anna routaeristyksen vahvuus...'
          />
        }
      />

      <FormControl
        label={<>Murskereunus (cm)</>}
        control={
          <Input
            name='murskeReunus'
            type='number'
            step='0.01'
            min='0'
            value={extraData && extraData.murskeReunus}
            placeholder='Anna murskereunuksen leveys...'
          />
        }
      />

      <Checkbox
        label='Pumppukaivo'
        name='pumppuKaivo'
        checked={extraData && extraData.pumppuKaivo}
      />

      <Checkbox
        label='Sadevesiputket + suppilot'
        name='sadevesiPutket'
        checked={extraData && extraData.sadevesiPutket}
      />

      <Checkbox
        label='Suodatinkangas'
        name='suodatinKangas'
        checked={extraData && extraData.suodatinKangas}
      />

      <Checkbox
        label='Tarkastuskaivot'
        name='tarkastusKaivot'
        checked={extraData && extraData.tarkastusKaivot}
      />

      <Checkbox
        label='Kalliotyö'
        name='kallioTyo'
        checked={extraData && extraData.kallioTyo}
      />
    </>
  );
};
