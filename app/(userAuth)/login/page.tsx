'use client';

import Link from 'next/link';
import { WFAuthInput } from '../_components/WFAuthInput';
import { WFAuthInputGroup } from '../_components/WFAuthInputGroup';
import { useLogin } from './useLogin';
import { WFAuthFormContainer } from '../_components/WFAuthFormContainer';
import { WFAuthMain } from '../_components/WFAuthMain';
import { WFAuthSubmitButton } from '../_components/WFAuthSubmitButton';
import { WFAuthInputGroupWrapper } from '../_components/WFAuthInputGroupWrapper';
import { WFAuthFormHeading } from '../_components/WFAuthFormHeading';
import { WFAuthForm } from '../_components/WFAuthForm';
import { SubLabel } from '@/components/UI/FormUtils';

export default function LoginPage() {
  const { loginHandler, updateData, status, data } = useLogin();

  return (
    <WFAuthMain>
      <WFAuthFormContainer>
        <WFAuthForm onSubmit={loginHandler}>
          <WFAuthFormHeading>Kirjaudu Sisään</WFAuthFormHeading>
          <WFAuthInputGroupWrapper>
            <WFAuthInputGroup>
              <WFAuthInputGroup.Label>Sähköposti</WFAuthInputGroup.Label>
              <WFAuthInput
                required
                value={data.email}
                name='email'
                type='email'
                placeholder='Sähköpostiosoite'
                onChange={updateData}
              />
              {status == 'invalid_user' || status == 'password_mismatch' ? (
                <SubLabel>
                  <span className='text-red-400'>Sähköposti tai salasana on virheellinen!</span>
                </SubLabel>
              ) : status == 'success' ? (
                <SubLabel>
                  <span className='text-green-400'>
                    Tunnistautuminen onnistui! Sinut uudelleenohjataan pian...
                  </span>
                </SubLabel>
              ) : null}
            </WFAuthInputGroup>

            <WFAuthInputGroup>
              <WFAuthInputGroup.Label>Salasana</WFAuthInputGroup.Label>
              <WFAuthInput
                required
                name='password'
                type='password'
                placeholder='Salasana'
                value={data.password}
                onChange={updateData}
              />
              <div className='flex w-full justify-start'>
                <Link
                  href='login/reset'
                  className='text-wf-primary'>
                  Unohditko salasanasi?
                </Link>
              </div>
            </WFAuthInputGroup>
          </WFAuthInputGroupWrapper>
          <WFAuthInputGroup>
            <WFAuthSubmitButton
              type='submit'
              disabled={status === 'loading' || status === 'success'}
              loading={status === 'loading'}>
              Kirjaudu Sisään
            </WFAuthSubmitButton>
            <div className='flex justify-center w-full'>
              <Link
                href='/register'
                className='text-white'>
                Eikö sinulla ole tiliä? Rekisteröidy.
              </Link>
            </div>
          </WFAuthInputGroup>
        </WFAuthForm>
      </WFAuthFormContainer>
    </WFAuthMain>
  );
}
