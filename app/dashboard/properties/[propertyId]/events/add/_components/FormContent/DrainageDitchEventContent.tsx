import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { FormControl, Input, Label } from '@/components/UI/FormUtils';
import { useEventTypeContext } from '../EventTypeProvider';
import { RadioButton } from '@/components/Feature/RadioGroup/RadioButton';
import { useEventFormContext } from '../EventFormContext';

export const DrainageDitchEventContent = () => {
  const { extraData } = useEventFormContext();
  const { refs } = useEventTypeContext();
  return (
    <>
      <FormControl
        label={<>Salaojasepeli (mm)</>}
        control={
          <Input
            name='salaojaSepeli'
            type='number'
            step='0.01'
            min='0'
            value={extraData && extraData.salaojaSepeli}
            placeholder='Anna salaojasepelin syvyys...'
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
            placeholder='Anna routaeristyksen syvyys...'
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
            placeholder='Anna murskereunuksen paksuus...'
          />
        }
      />
    </>
  );
};
