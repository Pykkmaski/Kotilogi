import Spinner from '@/components/UI/Spinner';
import { HeatingSystemSelector } from './HeatingSystemSelector';
import { useHeatingRenovationContent } from './hooks/useHeatingRenovationContent';
import { useEventFormContext } from '../../EventFormContext';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';

export const HeatingRenovationContent = () => {
  const { extraData, editing } = useEventFormContext();
  const { heatingSystems, isLoading, getAdditionalInputs, getBrandAndModelInputs } =
    useHeatingRenovationContent();

  console.log(isLoading);

  return (
    <RenderOnCondition
      condition={isLoading == false}
      fallback={<Spinner message='Ladataan...' />}>
      <HeatingSystemSelector
        helper='Jos olemassa oleva järjestelmä vaihdettiin, valitse vanhan järjestelmän tyyppi.'
        required={false}
        name='oldSystemId'
        label='Vanha järjestelmä'
        heatingSystems={heatingSystems}
        defaultCheckedValue={null}
        value={extraData && extraData.oldSystemId}
        includeNullOption
      />

      <HeatingSystemSelector
        required
        name='newSystemId'
        label='Uusi järjestelmä'
        disabled={editing}
        heatingSystems={heatingSystems}
        value={extraData && extraData.newSystemId}
      />
      {getAdditionalInputs()}
      {getBrandAndModelInputs()}
    </RenderOnCondition>
  );
};
