import { ignoreKeys } from 'kotilogi-app/utils/ignoreKeys';
import { useEventDetailsContext } from './EventDetails';
import { FalseInput } from '@/components/UI/FalseInput';
import { useMemo } from 'react';

export const RoofContent = () => {
  const { extraData } = useEventDetailsContext();
  const entries = useMemo(() => Object.entries(ignoreKeys(extraData, ['id'])), [extraData]);

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
