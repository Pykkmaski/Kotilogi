'use client';

import { Group } from '@/components/UI/Group';
import Link from 'next/link';
import { ErrorText } from '@/components/UI/Text';
import { MIN_PASSWORD_LENGTH, serviceName } from 'kotilogi-app/constants';
import { useRegister } from './useRegister';
import Spinner from '@/components/UI/Spinner';
import { Main } from '../_components/Main';
import { Form } from '../_components/Form';
import { Input } from '../_components/Input';
import { Button, SubmitButton } from '../_components/Button';
import { Checkbox } from '../_components/Checkbox';

/**This component is responsible for displaying the contents of the register page. */
export default function RegisterPage() {
  const { status, registerHandler, updateData } = useRegister();
  const loading = status === 'loading';

  return (
    <Main id='register-page-main'>
      <Form
        onSubmit={registerHandler}
        data-testid='register-form'
        onChange={updateData}>
        <h1 className='text-[64px] text-primary'>Rekisteröidy</h1>
        <div className='flex flex-col gap-2'>
          <Input
            placeholder='Sähköpostiosoite...'
            name='email'
            data-testid='register-email-input'
            type='email'
            required
          />

          {status === 'user_exists' ? (
            <div className='w-full flex flex-row xs:justify-normal xl:justify-end text-sm'>
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
            disabled={loading}
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
