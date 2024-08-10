'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/Feature/Input';
import { ContentCard } from '@/components/UI/RoundedBox';
import { Group } from '@/components/UI/Group';
import Link from 'next/link';
import { Padding } from '@/components/UI/Padding';
import { ErrorText } from '@/components/UI/Text';
import { useLogin } from './useLogin';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import Spinner from '@/components/UI/Spinner';

export default function LoginPage() {
  const router = useRouter();
  //const {updateData} = useInputData({});
  const { loginHandler, updateData, status } = useLogin();
  const loginCode = parseInt(useSearchParams().get('code'));

  const cancelHandler = () => {
    router.push('/');
  };

  useEffect(() => {
    if (loginCode == 1) {
      console.log(loginCode);
      toast.success('Käyttäjätili aktivoitu onnistuneesti!');
    }
  }, [loginCode]);

  const loading = status === 'loading';

  return (
    <main className='flex flex-col justify-center xl:items-center xs:items-[none] flex-1'>
      <Padding>
        <ContentCard title='Kirjaudu Sisään'>
          <form
            onSubmit={loginHandler}
            className='w-full flex flex-col xs:gap-4 xl:gap-8'>
            <div className='flex flex-col gap-2'>
              <Input
                data-testid='login-email-input'
                label='Sähköpostiosoite'
                description='Sähköpostiosoite jolle tili on rekisteröity.'
                type='email'
                name='email'
                required={true}
                placeholder='Kirjoita sähköpostiosoitteesi...'
                onChange={updateData}
              />

              {status === 'invalid_user' ||
              status === 'trial_expired' ||
              status === 'user_inactive' ? (
                <div className='w-full flex flex-row xs:justify-normal xl:justify-end text-sm'>
                  {status === 'invalid_user' ? (
                    <ErrorText data-testid='invalid-user-error'>
                      Käyttäjää annetulla sähköpostiosoitteella ei ole!
                    </ErrorText>
                  ) : status === 'trial_expired' ? (
                    <ErrorText>Kokeilujaksosi on päättynyt!</ErrorText>
                  ) : (
                    <ErrorText data-testid='inactive-user-error'>
                      Käyttäjätili on poistettu käytöstä!{' '}
                      <Link
                        href='/'
                        className='text-primary underline'>
                        Mitäs nyt?
                      </Link>
                    </ErrorText>
                  )}
                </div>
              ) : null}
            </div>

            <div className='flex flex-col gap-2'>
              <Input
                data-testid='login-password-input'
                label='Salasana'
                description='Tilin salasana.'
                type='password'
                name='password'
                placeholder='Kirjoita salasanasi...'
                required
                onChange={updateData}
              />

              {status === 'password_mismatch' ? (
                <div className='w-full flex flex-row xs:justify-normal xl:justify-end text-sm'>
                  <ErrorText data-testid='password-mismatch-error'>
                    Salasana on virheellinen!
                  </ErrorText>
                </div>
              ) : null}

              <div className='w-full flex justify-end gap-2'>
                <span style={{ color: 'gray' }}>Unohditko salasanasi? </span>
                <Link
                  data-testid='password-reset-link'
                  href='/login/reset'
                  className='text-green-500'>
                  Klikkaa tähän.
                </Link>
              </div>
            </div>

            <div className='w-full mt-4 border-t pt-4'>
              <Group
                direction='row'
                justify='end'
                gap={2}>
                <Button
                  variant='text'
                  color='primary'
                  type='button'
                  disabled={loading}
                  onClick={cancelHandler}>
                  Peruuta
                </Button>

                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={loading}
                  startIcon={loading && <Spinner size='1rem' />}>
                  Kirjaudu
                </Button>
              </Group>
            </div>
          </form>
        </ContentCard>
      </Padding>
    </main>
  );
}
