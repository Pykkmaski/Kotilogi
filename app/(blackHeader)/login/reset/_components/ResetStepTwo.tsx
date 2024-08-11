import { PrimaryButton } from '@/components/UI/Button/PrimaryButton';
import { SecondaryButton } from '@/components/UI/Button/SecondaryButton';
import { Group } from '@/components/UI/Group';
import { Input } from '@/components/Feature/Input';
import { ContentCard } from '@/components/UI/RoundedBox';
import Link from 'next/link';
import { useResetStepTwo } from './hooks/useResetStepTwo';
import { ErrorText } from '@/components/UI/Text';
import { useResetFormProvider } from './ResetFormContext';
import { Button } from '@mui/material';
import Spinner from '@/components/UI/Spinner';
import { Check } from '@mui/icons-material';

export function StepTwo() {
  const { data, status, resetStepTwoHandler, updateData } = useResetStepTwo();

  const loading = status === 'loading';

  return (
    <ContentCard title='Luo Uusi Salasana'>
      <p>
        Luo uusi salasana tällä lomakkeella. <br />
        Salasana tulee vaihtaa 30 minuutin sisällä.
      </p>

      <form
        onSubmit={resetStepTwoHandler}
        className='w-full mt-4 flex flex-col sm:gap-4 md:gap-8'>
        <Input
          autoComplete='new-password'
          type='password'
          name='password1'
          label='Anna Uusi Salasana'
          description='Tilisi uusi salasana.'
          placeholder='Kirjoita uusi salsanasi...'
          required
          minLength={8}
          onChange={updateData}
        />

        <div className='flex flex-col gap-2'>
          <Input
            label='Toista Salasana'
            description='Uuden salsanan vahvistus.'
            placeholder='Kirjoita salasana uudelleen...'
            type='password'
            name='password2'
            required
            onChange={updateData}
          />

          {status === 'password_mismatch' ? (
            <div className='w-full flex sm:justify-start md:justify-end text-sm'>
              <ErrorText>Salasanat eivät täsmää!</ErrorText>
            </div>
          ) : null}
        </div>

        <div className='mt-4 w-full'>
          <Group
            direction='row'
            justify='end'>
            <Button
              href='/login/reset'
              disabled={loading}>
              Takaisin
            </Button>

            <Button
              type='submit'
              disabled={loading || !data.password1 || !data.password2}
              startIcon={loading ? <Spinner size='1rem' /> : <Check />}>
              Lähetä
            </Button>
          </Group>
        </div>
      </form>
    </ContentCard>
  );
}
