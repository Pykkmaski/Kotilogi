import { useRouter } from 'next/navigation';
import { ContentCard } from '@/components/UI/RoundedBox';
import { Group } from '@/components/UI/Group';
import { PrimaryButton } from '@/components/UI/Button/PrimaryButton';
import { SecondaryButton } from '@/components/UI/Button/SecondaryButton';
import { ErrorText } from '@/components/UI/Text';
import { useResetStepOne } from './hooks/useResetStepOne';

import Spinner from '@/components/UI/Spinner';
import { Check } from '@mui/icons-material';
import { Form } from 'kotilogi-app/app/(userAuth)/_components/Form';
import { Input } from 'kotilogi-app/app/(userAuth)/_components/Input';
import { Button, SubmitButton } from 'kotilogi-app/app/(userAuth)/_components/Button';
import Link from 'next/link';
import { FormHeading } from 'kotilogi-app/app/(userAuth)/_components/FormHeading';
import { InputContainer } from 'kotilogi-app/app/(userAuth)/_components/InputContainer';
import { FormButtonContainer } from 'kotilogi-app/app/(userAuth)/_components/FormButtonContainer';
import { AltActionLink } from 'kotilogi-app/app/(userAuth)/_components/AltActionLink';

export function StepOne() {
  const router = useRouter();
  const { data, status, updateData, resetStepOneHandler } = useResetStepOne();

  const isDisabled = () => status === 'loading' || status === 'success';

  return (
    <Form
      onSubmit={resetStepOneHandler}
      onChange={updateData}>
      <FormHeading>Nollaa salasana</FormHeading>
      <p className='lg:text-[24px] xs:text-base text-[#757575]'>
        Anna ensin sähköpostiosoitteesi. Lähetämme sinulle salasanasi nollauslinkin.
      </p>
      <InputContainer>
        <Input
          data-testid='reset-pass-email-input'
          type='email'
          name='email'
          placeholder='Kirjoita sähköpostiosoitteesi...'
          required
        />

        {status === 'invalid_email' ? (
          <div className='flex w-full text-sm sm:justify-start md:justify-end'>
            <ErrorText data-testid='invalid-email-text'>
              Antamallesi sähköpostiosoitteelle ei löytynyt rekisteröityä käyttäjää!
            </ErrorText>
          </div>
        ) : null}
      </InputContainer>

      <FormButtonContainer>
        <SubmitButton
          loading={status === 'loading'}
          data-testid='submit-btn'
          color='primary'
          type='submit'
          disabled={!data.email || isDisabled()}>
          LÄHETÄ
        </SubmitButton>

        <AltActionLink href='/login'>Tai kirjaudu sisään</AltActionLink>
      </FormButtonContainer>
    </Form>
  );
}
