import Link from 'next/link';
import { useResetStepTwo } from './hooks/useResetStepTwo';
import { ErrorText } from '@/components/UI/Text';
import { Form } from 'kotilogi-app/app/(userAuth)/_components/Form';
import { Input } from 'kotilogi-app/app/(userAuth)/_components/Input';
import { SubmitButton } from 'kotilogi-app/app/(userAuth)/_components/Button';
import { FormButtonContainer } from 'kotilogi-app/app/(userAuth)/_components/FormButtonContainer';
import { InputContainer } from 'kotilogi-app/app/(userAuth)/_components/InputContainer';
import { FormHeading } from 'kotilogi-app/app/(userAuth)/_components/FormHeading';
import { AltActionLink } from 'kotilogi-app/app/(userAuth)/_components/AltActionLink';
import { WFAuthForm } from 'kotilogi-app/app/(userAuth)/_components/WFAuthForm';
import { WFAuthFormHeading } from 'kotilogi-app/app/(userAuth)/_components/WFAuthFormHeading';
import { WFAuthInputGroupWrapper } from 'kotilogi-app/app/(userAuth)/_components/WFAuthInputGroupWrapper';
import { WFAuthInput } from 'kotilogi-app/app/(userAuth)/_components/WFAuthInput';
import { WFAuthInputGroup } from 'kotilogi-app/app/(userAuth)/_components/WFAuthInputGroup';
import { WFAuthSubmitButton } from 'kotilogi-app/app/(userAuth)/_components/WFAuthSubmitButton';

export function StepTwo() {
  const { data, status, resetStepTwoHandler, updateData } = useResetStepTwo();

  const loading = status === 'loading';

  return (
    <WFAuthForm
      onSubmit={resetStepTwoHandler}
      onChange={updateData}>
      <WFAuthFormHeading>Nollaa salasana</WFAuthFormHeading>
      <WFAuthInputGroupWrapper>
        <WFAuthInputGroup>
          <WFAuthInputGroup.Label>Salasana</WFAuthInputGroup.Label>
          <WFAuthInput
            data-testid='password-input1'
            autoComplete='new-password'
            type='password'
            name='password1'
            placeholder='Kirjoita uusi salsana...'
            required
            minLength={8}
          />
        </WFAuthInputGroup>
      </WFAuthInputGroupWrapper>

      <WFAuthInputGroup>
        <WFAuthInputGroup.Label>Salasana uudelleen</WFAuthInputGroup.Label>
        <WFAuthInput
          data-testid='password-input2'
          placeholder='Kirjoita salasana uudelleen...'
          type='password'
          name='password2'
          required
        />

        {status === 'password_mismatch' ? (
          <div className='w-full flex sm:justify-start md:justify-end text-sm'>
            <ErrorText data-testid='password-error-text'>Salasanat eivät täsmää!</ErrorText>
          </div>
        ) : null}
      </WFAuthInputGroup>
      <WFAuthSubmitButton
        data-testid='submit-btn'
        type='submit'
        disabled={loading || !data.password1 || !data.password2}>
        LÄHETÄ
      </WFAuthSubmitButton>
    </WFAuthForm>
  );
}
