import Spinner from '@/components/UI/Spinner';
import { HeatingSystemSelector } from './HeatingSystemSelector';
import { useHeatingRenovationContent } from './hooks/useHeatingRenovationContent';
import { useEventFormContext } from '../../EventFormContext';

export const HeatingRenovationContent = () => {
  const { extraData, editing } = useEventFormContext();
  const { heatingSystems, isLoading, getAdditionalInputs, getBrandAndModelInputs } =
    useHeatingRenovationContent();

  return (
    <>
      {isLoading ? (
        <Spinner
          message='Ladataan...'
          size='1rem'
        />
      ) : (
        <>
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
        </>
      )}
    </>
  );
};
