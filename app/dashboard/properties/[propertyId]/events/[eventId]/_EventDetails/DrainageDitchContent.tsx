import { LabelGrid } from '@/components/New/LabelGrid';
import { useEventDetailsContext } from './EventDetails';
import { FalseInput } from '@/components/UI/FalseInput';
import { ignoreKeys } from 'kotilogi-app/utils/ignoreKeys';
import { useMemo } from 'react';

export const DrainageDitchContent = () => {
  const { extraData } = useEventDetailsContext();
  const entries = useMemo(
    () => Object.entries(ignoreKeys(extraData, ['id', 'toteutusTapaId'])),
    [extraData]
  );

  return (
    <>
      {entries.map(([key, val]) => {
        const variant = typeof val === 'boolean' ? 'checkbox' : 'field';

        return (
          <FalseInput
            label={key}
            value={val}
            variant={variant}
          />
        );
      })}
    </>
  );
};
