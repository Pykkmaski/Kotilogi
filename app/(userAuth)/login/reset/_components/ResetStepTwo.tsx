import { PrimaryButton } from '@/components/UI/Button/PrimaryButton';
import { SecondaryButton } from '@/components/UI/Button/SecondaryButton';
import { Group } from '@/components/UI/Group';

import { ContentCard } from '@/components/UI/RoundedBox';
import Link from 'next/link';
import { useResetStepTwo } from './hooks/useResetStepTwo';
import { ErrorText } from '@/components/UI/Text';
import { useResetFormProvider } from './ResetFormContext';
import { Button } from '@mui/material';
import Spinner from '@/components/UI/Spinner';
import { Check } from '@mui/icons-material';
import { Form } from 'kotilogi-app/app/(userAuth)/_components/Form';
import { Input } from 'kotilogi-app/app/(userAuth)/_components/Input';
import { SubmitButton } from 'kotilogi-app/app/(userAuth)/_components/Button';

export function StepTwo() {
  const { data, status, resetStepTwoHandler, updateData } = useResetStepTwo();

  const loading = status === 'loading';

  return (
    <Form
      onSubmit={resetStepTwoHandler}
      onChange={updateData}>
      <h1 className='text-[64px] text-primary'>Nollaa salasana</h1>

      <Input
        data-testid='password-input1'
        autoComplete='new-password'
        type='password'
        name='password1'
        placeholder='Kirjoita uusi salsana...'
        required
        minLength={8}
      />

      <div className='flex flex-col gap-2'>
        <Input
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
      </div>

      <div className='mt-4 w-full flex items-center gap-4'>
        <SubmitButton
          data-testid='submit-btn'
          type='submit'
          disabled={loading || !data.password1 || !data.password2}
          loading={loading}>
          Lähetä
        </SubmitButton>
        <Link
          href='/login'
          className='text-[18px] text-[#757575] font-[600]'>
          Tai kirjaudu sisään
        </Link>
      </div>
    </Form>
  );
}
