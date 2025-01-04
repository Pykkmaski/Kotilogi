import { useRouter } from 'next/navigation';
import { ErrorText } from '@/components/UI/Text';
import { useResetStepOne } from './hooks/useResetStepOne';

import { Form } from 'kotilogi-app/app/(userAuth)/_components/Form';
import { Input } from 'kotilogi-app/app/(userAuth)/_components/Input';
import { SubmitButton } from 'kotilogi-app/app/(userAuth)/_components/Button';
import { FormHeading } from 'kotilogi-app/app/(userAuth)/_components/FormHeading';
import { InputContainer } from 'kotilogi-app/app/(userAuth)/_components/InputContainer';
import { FormButtonContainer } from 'kotilogi-app/app/(userAuth)/_components/FormButtonContainer';
import { AltActionLink } from 'kotilogi-app/app/(userAuth)/_components/AltActionLink';
import { WFAuthForm } from 'kotilogi-app/app/(userAuth)/_components/WFAuthForm';
import { WFAuthFormHeading } from 'kotilogi-app/app/(userAuth)/_components/WFAuthFormHeading';
import { WFAuthInputGroupWrapper } from 'kotilogi-app/app/(userAuth)/_components/WFAuthInputGroupWrapper';
import { WFAuthInputGroup } from 'kotilogi-app/app/(userAuth)/_components/WFAuthInputGroup';
import { WFAuthInput } from 'kotilogi-app/app/(userAuth)/_components/WFAuthInput';
import { WFAuthSubmitButton } from 'kotilogi-app/app/(userAuth)/_components/WFAuthSubmitButton';
import { SubLabel } from '@/components/UI/FormUtils';

export function StepOne() {
  const router = useRouter();
  const { data, status, updateData, resetStepOneHandler } = useResetStepOne();

  const isDisabled = () => status === 'loading' || status === 'success';

  return (
    <WFAuthForm
      onSubmit={resetStepOneHandler}
      onChange={updateData}>
      <WFAuthFormHeading>Nollaa salasana</WFAuthFormHeading>
      <p className='text-base text-white'>
        Anna ensin sähköpostiosoitteesi. Lähetämme sinulle salasanasi nollauslinkin.
      </p>
      <WFAuthInputGroupWrapper>
        <WFAuthInputGroup>
          <WFAuthInputGroup.Label>Sähköposti</WFAuthInputGroup.Label>
          <WFAuthInput
            data-testid='reset-pass-email-input'
            type='email'
            name='email'
            placeholder='Kirjoita sähköpostiosoitteesi...'
            required
          />

          {status === 'invalid_email' ? (
            <SubLabel data-testid='invalid-email-text'>
              <span className='text-red-400'>
                Antamallesi sähköpostiosoitteelle ei löytynyt rekisteröityä käyttäjää!
              </span>
            </SubLabel>
          ) : null}
        </WFAuthInputGroup>
      </WFAuthInputGroupWrapper>
      <WFAuthSubmitButton
        data-testid='submit-btn'
        color='primary'
        type='submit'
        disabled={!data.email || isDisabled()}
        loading={status === 'loading'}>
        Lähetä
      </WFAuthSubmitButton>
    </WFAuthForm>
  );
}
