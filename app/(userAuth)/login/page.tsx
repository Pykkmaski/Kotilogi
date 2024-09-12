'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ErrorText } from '@/components/UI/Text';
import { useLogin } from './useLogin';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Input } from '../_components/Input';
import { SubmitButton } from '../_components/Button';
import { InputBadge } from '../_components/InputBadge';
import { Clear } from '@mui/icons-material';
import { Main } from '../_components/Main';
import { Form } from '../_components/Form';

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
    <Main id='login-page-main'>
      <Form
        onSubmit={loginHandler}
        onChange={updateData}>
        <h1 className='text-primary font-semibold lg:text-6xl xs:text-3xl lg:text-start xs:text-center'>
          Kirjaudu Sisään
        </h1>

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

        <div className='flex lg:justify-end xs:justify-center w-full'>
          <Link
            data-testid='password-reset-link'
            href='/login/reset'
            className='text-[#757575] text-[18px]'>
            Unohditko salasanasi?
          </Link>
        </div>

        <div
          id='login-form-controls'
          className='flex xs:flex-col lg:flex-row items-center gap-8'>
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
      </Form>
    </Main>
  );
}
