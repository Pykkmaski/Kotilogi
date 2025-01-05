'use client';

import { useSearchParams } from 'next/navigation';
import { StepOne } from './ResetStepOne';
import { StepTwo } from './ResetStepTwo';
import { CarouselProvider } from '@/components/Util/CarouselProvider';
import { WFAuthFormContainer } from 'kotilogi-app/app/(wf)/(userAuth)/_components/WFAuthFormContainer';

export default function ResetForm() {
  const params = useSearchParams();
  const token = params.get('token');

  return (
    /*
    <ResetFormProvider
      state={state as State}
      next={next}
      previous={previous}
      reset={reset}
      dispatch={dispatch}>
      {state.step === 1 ? <StepOne /> : state.step === 2 ? <StepTwo /> : null}
    </ResetFormProvider>
    */

    <WFAuthFormContainer>
      <CarouselProvider defaultSlot={token ? 'reset-step' : 'email-step'}>
        <CarouselProvider.Slot slotName='email-step'>
          <StepOne />
        </CarouselProvider.Slot>

        <CarouselProvider.Slot slotName='reset-step'>
          <StepTwo />
        </CarouselProvider.Slot>
      </CarouselProvider>
    </WFAuthFormContainer>
  );
}
