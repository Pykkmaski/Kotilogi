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

export function StepOne() {
  const router = useRouter();
  const { data, status, updateData, resetStepOneHandler } = useResetStepOne();

  const isDisabled = () => status === 'loading' || status === 'success';

  return (
    <Form
      onSubmit={resetStepOneHandler}
      onChange={updateData}>
      <h1 className='text-[64px] text-primary'>Nollaa salasana</h1>
      <p className='text-[24px] text-[#757575]'>
        Anna ensin sähköpostiosoitteesi. Lähetämme sinulle salasanasi nollauslinkin.
      </p>
      <div className='flex flex-col gap-2'>
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
      </div>

      <div className='mt-4 flex items-center gap-4'>
        <SubmitButton
          loading={status === 'loading'}
          data-testid='submit-btn'
          color='primary'
          type='submit'
          disabled={!data.email || isDisabled()}>
          LÄHETÄ
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
