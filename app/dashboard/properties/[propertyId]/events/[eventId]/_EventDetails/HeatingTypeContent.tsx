import { LabelGrid } from '@/components/New/LabelGrid';
import { useEventDetailsContext } from './EventDetails';
import { ModelAndBrandDetails } from './ModelAndBrandDetails';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { useMemo } from 'react';
import { ignoreKeys } from 'kotilogi-app/utils/ignoreKeys';
import { FalseInput } from '@/components/UI/FalseInput';

export const HeatingTypeContent = () => {
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
