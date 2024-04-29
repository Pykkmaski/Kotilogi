'use client';

import { PrimaryButton } from '../../../../../../../components/UI/Button/PrimaryButton';
import { DateRangeSelector } from '../../../../../../../components/Feature/DateRangeSelector';
import { VisibilityProvider } from '../../../../../../../components/Util/VisibilityProvider';

export function SelectTimeSpanButton({ children }) {
  return (
    <VisibilityProvider>
      <div className='flex flex-col relative gap-4'>
        <VisibilityProvider.Trigger>
          <PrimaryButton>Valitse Aikaväli</PrimaryButton>
        </VisibilityProvider.Trigger>

        <VisibilityProvider.Target>{children}</VisibilityProvider.Target>
      </div>
    </VisibilityProvider>
  );
}
