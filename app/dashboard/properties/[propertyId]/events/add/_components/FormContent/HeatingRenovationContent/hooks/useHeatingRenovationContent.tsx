import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { getCurrentHeatingSystems, getHeatingSystems } from '../../actions';
import { useQuery } from '@tanstack/react-query';
import { useEventFormContext } from '../../../EventFormContext';
import { BrandAndModelInputs } from '../BrandModelInputs';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { ElectricHeatingMethodSelector } from '../ElectricHeatingMethodSelector';
import { useCallback } from 'react';

export function useHeatingRenovationContent() {
  const { eventData, editing, payload, updatePayload, resetPayload } = useEventFormContext();
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
    queryFn: async () => {
      console.log(eventData);
      return await getCurrentHeatingSystems(eventData.property_id);
    },
  });

  const getBrandAndModelInputs = useCallback(() => {
    if (isLoading) return null;
    var modelLabel,
      brandLabel,
      modelPlaceholder = 'Kirjoita malli...',
      brandPlaceholder = 'Kirjoita merkki...';
    const { new_heating_type } = payload;
    if (new_heating_type == 'Kaukolämpö') {
      modelLabel = 'Lämmönjakajan malli';
      brandLabel = 'Lämmönjakajan merkki';
      modelPlaceholder = 'Kirjoita lämmönjakajan malli...';
      brandPlaceholder = 'Kirjoita lämmönjakajan merkki...';
    } else if (new_heating_type == 'Sähkö') {
      modelLabel = 'Lämminvesivaraajan malli';
      brandLabel = 'Lämminvesivaraajan merkki';
      modelPlaceholder = 'Kirjoita lämminvesivaraajan malli...';
      brandPlaceholder = 'Kirjoita lämminvesivaraajan merkki...';
    } else if (new_heating_type == 'Maalämpö') {
      modelLabel = 'Pumpun malli';
      brandLabel = 'Pumpun merkki';
      modelPlaceholder = 'Kirjoita pumpun malli...';
      brandPlaceholder = 'Kirjoita pumpun merkki...';
    } else if (new_heating_type == 'Öljy') {
      modelLabel = 'Öljylämmityskeskuksen malli';
      brandLabel = 'Öljylämmityskeskuksen merkki';
      modelPlaceholder = 'Kirjoita öljylämmityskeskuksen malli...';
      brandPlaceholder = 'Kirjoita öljylämmityskeskuksen merkki...';
    } else if (
      new_heating_type == 'Vesi-ilmalämpöpumppu' ||
      new_heating_type == 'Ilmalämpöpumppu'
    ) {
      modelLabel = 'Malli';
      brandLabel = 'Merkki';
      modelPlaceholder = 'Kirjoita malli...';
      brandPlaceholder = 'Kirjoita merkki...';
    } else if (new_heating_type == 'Pelletti') {
      modelLabel = 'Pellettilämmityskeskuksen Malli';
      brandLabel = 'Pellettilämmityskeskuksen Merkki';
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
  }, [heatingSystems, eventData, payload]);

  /**Returns inputs pertaining to the new selected system. */
  const getAdditionalInputs = useCallback(() => {
    if (isLoading) return null;

    const { new_heating_type } = payload;

    if (new_heating_type == 'Öljy') {
      return (
        <>
          <FormControl
            label='Öljysäiliön tilavuus (Litraa)'
            control={
              <Input
                name='oil_vessel_volume'
                type='number'
                value={payload.oil_vessel_volume || ''}
                placeholder='Anna öljysäiliön tilavuus...'
                onChange={updatePayload}
              />
            }
          />

          <FormControl
            label='Öljysäiliön sijainti'
            control={
              <Input
                value={payload.oil_vessel_location || ''}
                name='oil_vessel_location'
                type='text'
                placeholder='Kirjoita vapaamuotoinen öljysäiliön sijainti...'
                onChange={updatePayload}
              />
            }
          />
        </>
      );
    } else if (new_heating_type == 'Sähkö') {
      return (
        <>
          <ElectricHeatingMethodSelector />
        </>
      );
    } else if (new_heating_type == 'Pelletti') {
    } else {
      return null;
    }
  }, [eventData, heatingSystems, payload]);

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
