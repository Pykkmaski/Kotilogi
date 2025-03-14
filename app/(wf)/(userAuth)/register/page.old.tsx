'use client';

import Link from 'next/link';
import { ErrorText } from '@/components/UI/Text';
import { serviceName } from 'kotilogi-app/constants';
import { useRegister } from './useRegister';
import { Main } from '../_components/Main';
import { Form } from '../_components/Form';
import { Input } from '../_components/Input';
import { SubmitButton } from '../_components/Button';
import { Checkbox } from '../_components/Checkbox';
import { ErrorBadge, SuccessBadge } from '../_components/InputBadge';
import { InputContainer } from '../_components/InputContainer';
import { FormHeading } from '../_components/FormHeading';
import { FormButtonContainer } from '../_components/FormButtonContainer';
import { AltActionLink } from '../_components/AltActionLink';
import { InputErrorTextContainer } from '../_components/InputErrorTextContainer';

/**This component is responsible for displaying the contents of the register page. */
export default function RegisterPage() {
  const { status, registerHandler, updateData, data } = useRegister();
  const loading = status === 'loading';
  const submitDisabled = loading || status === 'user_exists';

  return (
    <Main id='register-page-main'>
      <Form
        onSubmit={registerHandler}
        data-testid='register-form'
        onChange={updateData}>
        <FormHeading>Rekisteröidy</FormHeading>
        <InputContainer>
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
            <InputErrorTextContainer>
              <ErrorText data-testid='email-error-text'>
                Tili annetulle sähköpostiosoitteelle on jo olemassa!
              </ErrorText>
            </InputErrorTextContainer>
          ) : null}
        </InputContainer>

        <InputContainer>
          <div className='flex flex-col xl:gap-8 xs:gap-4'>
            <Input
              data-testid='register-password1-input'
              type='password'
              required
              placeholder='Kirjoita salasana...'
              autoComplete='new-password'
              name='password'
              minLength={8}
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
            <InputErrorTextContainer>
              <ErrorText data-testid='password-error-text'>Salasanat eivät täsmää</ErrorText>
            </InputErrorTextContainer>
          ) : null}
        </InputContainer>

        <div className='w-full flex flex-row gap-2 items-center sm:justify-center lg:justify-start'>
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

        <FormButtonContainer>
          <SubmitButton
            type='submit'
            title='Rekisteröidy Kotidokin käyttäjäksi'
            disabled={submitDisabled}
            data-testid='register-submit-btn'
            loading={loading}>
            Rekisteröidy
          </SubmitButton>
          <AltActionLink
            href='/login'
            data-testid='register-cancel-btn'>
            Onko sinulla tili? Kirjaudu sisään
          </AltActionLink>
        </FormButtonContainer>
      </Form>
    </Main>
  );
}
