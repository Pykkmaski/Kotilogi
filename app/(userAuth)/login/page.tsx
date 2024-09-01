'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ContentCard } from '@/components/UI/RoundedBox';
import { Group } from '@/components/UI/Group';
import Link from 'next/link';
import { Padding } from '@/components/UI/Padding';
import { ErrorText } from '@/components/UI/Text';
import { useLogin } from './useLogin';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Spinner from '@/components/UI/Spinner';
import { Input } from '../_components/Input';
import styles from '../styles.module.css';
import { SubmitButton, Button } from '../_components/Button';
import { InputBadge } from '../_components/InputIcon';
import { Check, Clear } from '@mui/icons-material';
import { ErrorMessage } from '@/components/UI/FormUtils';

export default function LoginPage() {
  const router = useRouter();
  //const {updateData} = useInputData({});
  const { loginHandler, updateData, status, data } = useLogin();
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
  const invalidUser = status === 'invalid_user';
  const invalidPassword = status == 'password_mismatch';

  return (
    <main
      id='login-page-main'
      className='flex flex-col gap-4 flex-1 justify-center'>
      <form
        onSubmit={loginHandler}
        onChange={updateData}
        className='z-10 flex flex-col gap-8 animate-slideup-fast w-[665px]'>
        <h1 className='text-primary font-semibold text-[64px]'>Kirjaudu Sisään</h1>

        <div className='flex flex-col gap-2'>
          <Input
            name='email'
            type='email'
            badge={
              invalidUser && (
                <InputBadge
                  icon={<Clear sx={{ color: 'white' }} />}
                  variant='error'
                />
              )
            }
            data-testid='login-email-input'
            placeholder='Sähköpostiosoite...'
            required
          />
          {invalidUser && (
            <span className='w-full flex justify-end'>
              <ErrorText data-testid='invalid-email-text'>
                Tiliä annetulla sähköpostiosoitteella ei ole!
              </ErrorText>
            </span>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <Input
            name='password'
            type='password'
            data-testid='login-password-input'
            placeholder='Salasana...'
            required
          />
          {invalidPassword && (
            <span className='w-full flex justify-end'>
              <ErrorText data-testid='invalid-password-text'>Salasana on virheellinen!</ErrorText>
            </span>
          )}
        </div>

        <div className='flex justify-end w-full'>
          <Link
            data-testid='password-reset-link'
            href='/login/reset'
            className='text-[#757575] text-[18px]'>
            Unohditko salasanasi?
          </Link>
        </div>

        <div
          id='login-form-controls'
          className='flex items-center gap-8'>
          <SubmitButton
            loading={loading}
            disabled={loading}
            data-testid='login-submit-btn'
            type='submit'>
            KIRJAUDU
          </SubmitButton>
          <Link
            href='/register'
            className='text-[#757575] font-[600] text-[18px]'>
            Eikö sinulla ole tiliä?
          </Link>
        </div>
      </form>
    </main>
  );
}
