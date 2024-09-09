'use client';

import Link from 'next/link';
import { ErrorText } from '@/components/UI/Text';
import { MIN_PASSWORD_LENGTH, serviceName } from 'kotilogi-app/constants';
import { useRegister } from './useRegister';
import { Main } from '../_components/Main';
import { Form } from '../_components/Form';
import { Input } from '../_components/Input';
import { SubmitButton } from '../_components/Button';
import { Checkbox } from '../_components/Checkbox';
import { ErrorBadge, SuccessBadge } from '../_components/InputBadge';

/**This component is responsible for displaying the contents of the register page. */
export default function RegisterPage() {
  const { status, registerHandler, updateData, data } = useRegister();
  const loading = status === 'loading';
  const submitDisabled = loading || status === 'user_exists' || !data.tosAccepted;

  return (
    <Main id='register-page-main'>
      <Form
        onSubmit={registerHandler}
        data-testid='register-form'
        onChange={updateData}>
        <h1 className='text-[64px] text-primary'>Rekisteröidy</h1>
        <div className='flex flex-col gap-2 relative'>
          <Input
            placeholder='Sähköpostiosoite...'
            name='email'
            data-testid='register-email-input'
            type='email'
            required
            badge={
              status === 'user_exists' ? (
                <ErrorBadge />
              ) : data.email && data.email.length ? (
                <SuccessBadge />
              ) : null
            }
          />

          {status === 'user_exists' ? (
            <div className='w-full flex flex-row xs:justify-normal xl:justify-end text-sm absolute -bottom-6'>
              <ErrorText data-testid='email-error-text'>
                Tili annetulle sähköpostiosoitteelle on jo olemassa!
              </ErrorText>
            </div>
          ) : null}
        </div>

        <div className='flex flex-col gap-2'>
          <div className='flex flex-col xl:gap-8 xs:gap-4'>
            <Input
              data-testid='register-password1-input'
              type='password'
              required
              placeholder='Kirjoita salasana...'
              autoComplete='new-password'
              name='password'
              minLength={MIN_PASSWORD_LENGTH}
            />

            <Input
              data-testid='register-password2-input'
              type='password'
              required
              placeholder='Kirjoita salasana uudelleen...'
              autoComplete='new-password'
              name='password2'
            />
          </div>

          {/**Align the error to the right if on a bigger than mobile device */}
          {status === 'password_mismatch' ? (
            <div className='w-full flex xs:justify-normal xl:justify-end text-sm'>
              <ErrorText data-testid='password-error-text'>Salasanat eivät täsmää</ErrorText>
            </div>
          ) : null}
        </div>

        <div className='w-full flex flex-row gap-2 items-center'>
          <Checkbox
            name='tosAccepted'
            data-testid='register-tos-checkbox'
            required
          />
          <span className='text-[16px] text-[#757575]'>
            Olen lukenut <span data-testid='service-name'>{serviceName}</span>:n{' '}
            <Link
              data-testid='register-tos-link'
              href='/tos'
              target='_blank'
              className='text-green-500'>
              käyttöehdot
            </Link>
            :
          </span>
        </div>

        <div className='flex items-center mt-4 pt-[1rem] gap-4 w-full'>
          <SubmitButton
            type='submit'
            title='Rekisteröidy Kotidokin käyttäjäksi'
            disabled={submitDisabled}
            data-testid='register-submit-btn'
            loading={loading}>
            Rekisteröidy
          </SubmitButton>
          <Link
            href='/login'
            className='text-[#757575] font-[600] text-[18px]'
            data-testid='register-cancel-btn'>
            Onko sinulla tili? Kirjaudu sisään
          </Link>
        </div>
      </Form>
    </Main>
  );
}