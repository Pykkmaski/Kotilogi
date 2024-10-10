import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { getHeatingSystems } from '../../actions';
import { useQuery } from '@tanstack/react-query';
import { useEventFormContext } from '../../../EventFormContext';
import { BrandAndModelInputs } from '../BrandModelInputs';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { ElectricHeatingMethodSelector } from '../ElectricHeatingMethodSelector';

export function useHeatingRenovationContent() {
  const { extraData, editing } = useEventFormContext();
  const { data: heatingSystems, isLoading } = useQuery({
    queryKey: ['heatingSystems'],
    queryFn: async () => await getHeatingSystems(),
  });

  const getBrandAndModelInputs = () => {
    var modelLabel, brandLabel, modelPlaceholder, brandPlaceholder;

    const { newSystemId } = extraData;

    if (newSystemId == getIdByLabel(heatingSystems, 'Kaukolämpö', 'name')) {
      modelLabel = 'Lämmönjakajan malli';
      brandLabel = 'Lämmönjakajan merkki';
      modelPlaceholder = 'Kirjoita lämmönjakajan malli...';
      brandPlaceholder = 'Kirjoita lämmönjakajan merkki...';
    } else if (newSystemId == getIdByLabel(heatingSystems, 'Sähkö', 'name')) {
      modelLabel = 'Lämminvesivaraajan malli';
      brandLabel = 'Lämminvesivaraajan merkki';
      modelPlaceholder = 'Kirjoita lämminvesivaraajan malli...';
      brandPlaceholder = 'Kirjoita lämminvesivaraajan merkki...';
    } else if (newSystemId == getIdByLabel(heatingSystems, 'Maalämpö', 'name')) {
      modelLabel = 'Pumpun malli';
      brandLabel = 'Pumpun merkki';
      modelPlaceholder = 'Kirjoita pumpun malli...';
      brandPlaceholder = 'Kirjoita pumpun merkki...';
    } else if (newSystemId == getIdByLabel(heatingSystems, 'Öljy', 'name')) {
      modelLabel = 'Öljylämmityskeskuksen malli';
      brandLabel = 'Öljylämmityskeskuksen merkki';
      modelPlaceholder = 'Kirjoita öljylämmityskeskuksen malli...';
      brandPlaceholder = 'Kirjoita öljylämmityskeskuksen merkki...';
    } else if (newSystemId == getIdByLabel(heatingSystems, 'Ilma-vesilämpöpumppu')) {
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
  };

  /**Returns inputs pertaining to the new selected system. */
  const getAdditionalInputs = () => {
    const { newSystemId } = extraData;

    if (newSystemId == getIdByLabel(heatingSystems, 'Öljy', 'name')) {
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
    } else if (newSystemId == getIdByLabel(heatingSystems, 'Sähkö', 'name')) {
      return (
        <>
          <ElectricHeatingMethodSelector />
        </>
      );
    } else {
      return null;
    }
  };

  return {
    getBrandAndModelInputs,
    getAdditionalInputs,
    isLoading,
    heatingSystems,
  };
}
