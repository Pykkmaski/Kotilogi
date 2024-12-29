import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { getCurrentHeatingSystems, getHeatingSystems } from '../../actions';
import { useQuery } from '@tanstack/react-query';
import { useEventFormContext } from '../../../EventFormContext';
import { BrandAndModelInputs } from '../BrandModelInputs';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { ElectricHeatingMethodSelector } from '../ElectricHeatingMethodSelector';
import { useCallback } from 'react';

export function useHeatingRenovationContent() {
  const { eventData, editing } = useEventFormContext();
  const { data: heatingSystems, isLoading } = useQuery({
    queryKey: ['heatingSystems'],
    queryFn: async () => await getHeatingSystems(),
  });

  const {
    data: currentHeatingSystems,
    isLoading: currentIsLoading,
    error: currentError,
  } = useQuery({
    queryKey: ['current-heating-systems'],
    queryFn: async () => getCurrentHeatingSystems(eventData.property_id),
  });

  const getBrandAndModelInputs = useCallback(() => {
    if (isLoading) return null;
    var modelLabel, brandLabel, modelPlaceholder, brandPlaceholder;

    const { new_system_id } = eventData;

    if (new_system_id == getIdByLabel(heatingSystems, 'Kaukolämpö', 'name')) {
      modelLabel = 'Lämmönjakajan malli';
      brandLabel = 'Lämmönjakajan merkki';
      modelPlaceholder = 'Kirjoita lämmönjakajan malli...';
      brandPlaceholder = 'Kirjoita lämmönjakajan merkki...';
    } else if (new_system_id == getIdByLabel(heatingSystems, 'Sähkö', 'name')) {
      modelLabel = 'Lämminvesivaraajan malli';
      brandLabel = 'Lämminvesivaraajan merkki';
      modelPlaceholder = 'Kirjoita lämminvesivaraajan malli...';
      brandPlaceholder = 'Kirjoita lämminvesivaraajan merkki...';
    } else if (new_system_id == getIdByLabel(heatingSystems, 'Maalämpö', 'name')) {
      modelLabel = 'Pumpun malli';
      brandLabel = 'Pumpun merkki';
      modelPlaceholder = 'Kirjoita pumpun malli...';
      brandPlaceholder = 'Kirjoita pumpun merkki...';
    } else if (new_system_id == getIdByLabel(heatingSystems, 'Öljy', 'name')) {
      modelLabel = 'Öljylämmityskeskuksen malli';
      brandLabel = 'Öljylämmityskeskuksen merkki';
      modelPlaceholder = 'Kirjoita öljylämmityskeskuksen malli...';
      brandPlaceholder = 'Kirjoita öljylämmityskeskuksen merkki...';
    } else if (new_system_id == getIdByLabel(heatingSystems, 'Ilma-vesilämpöpumppu')) {
      modelLabel = 'Malli';
      brandLabel = 'Merkki';
      modelPlaceholder = 'Kirjoita malli...';
      brandPlaceholder = 'Kirjoita merkki...';
    } else {
      return null;
    }

    return (
      <BrandAndModelInputs
        modelLabel={modelLabel}
        brandLabel={brandLabel}
        modelPlaceholder={modelPlaceholder}
        brandPlaceholder={brandPlaceholder}
      />
    );
  }, [heatingSystems, eventData]);

  /**Returns inputs pertaining to the new selected system. */
  const getAdditionalInputs = useCallback(() => {
    if (isLoading) return null;

    const { new_system_id } = eventData;
    if (new_system_id == getIdByLabel(heatingSystems, 'Öljy', 'name')) {
      return (
        <>
          <FormControl
            label='Öljysäiliön tilavuus (Litraa)'
            control={
              <Input
                name='volume'
                type='number'
                placeholder='Anna öljysäiliön tilavuus...'
              />
            }
          />

          <FormControl
            label='Öljysäiliön sijainti'
            control={
              <Input
                name='location'
                type='text'
                placeholder='Kirjoita vapaamuotoinen öljysäiliön sijainti...'
              />
            }
          />
        </>
      );
    } else if (new_system_id == getIdByLabel(heatingSystems, 'Sähkö', 'name')) {
      return (
        <>
          <ElectricHeatingMethodSelector />
        </>
      );
    } else {
      return null;
    }
  }, [eventData, heatingSystems]);

  return {
    getBrandAndModelInputs,
    getAdditionalInputs,
    isLoading,
    heatingSystems,
    currentHeatingSystems,
    currentError,
    currentIsLoading,
  };
}
