import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { useQuery } from '@tanstack/react-query';
import { getEristeMateriaalit } from '../actions';
import { useEventFormContext } from '../../EventFormContext';
import { MaterialSelector } from './MaterialSelector';
import { TargetSelector } from './TargetSelector';

export const EristeEventContent = () => {
  return (
    <>
      <MaterialSelector />
      <TargetSelector />
    </>
  );
};
