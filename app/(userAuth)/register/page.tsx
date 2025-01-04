'use client';

import Link from 'next/link';
import { WFAuthForm } from '../_components/WFAuthForm';
import { WFAuthFormContainer } from '../_components/WFAuthFormContainer';
import { WFAuthFormHeading } from '../_components/WFAuthFormHeading';
import { WFAuthInput } from '../_components/WFAuthInput';
import { WFAuthInputGroup } from '../_components/WFAuthInputGroup';
import { WFAuthInputGroupWrapper } from '../_components/WFAuthInputGroupWrapper';
import { WFAuthMain } from '../_components/WFAuthMain';
import { WFAuthSubmitButton } from '../_components/WFAuthSubmitButton';
import { useRegister } from './useRegister';
import { SubLabel } from '@/components/UI/FormUtils';
import { Notification } from '@/components/UI/Notification';

export default function RegisterPage() {
  const { registerHandler, data, updateData, status } = useRegister();
  return (
    <WFAuthMain>
      <WFAuthFormContainer>
        <WFAuthForm onSubmit={registerHandler}>
          <WFAuthFormHeading>Rekisteröidy</WFAuthFormHeading>
          <WFAuthInputGroupWrapper>
            <WFAuthInputGroup>
              <WFAuthInputGroup.Label>Sähköposti</WFAuthInputGroup.Label>
              <WFAuthInput
                required
                name='email'
                placeholder='Sähköposti'
                type='email'
                onChange={updateData}
                value={data.email}
              />
              {status == 'user_exists' ? (
                <SubLabel>
                  <span className='text-red-400'>Käyttäjätili on jo olemassa!</span>
                </SubLabel>
              ) : null}
            </WFAuthInputGroup>

            <WFAuthInputGroup>
              <WFAuthInputGroup.Label>Salasana</WFAuthInputGroup.Label>
              <WFAuthInput
                required
                name='password'
                autoComplete='new-password'
                placeholder='Salasana'
                type='password'
                onChange={updateData}
                value={data.password}
              />
            </WFAuthInputGroup>

            <WFAuthInputGroup>
              <WFAuthInputGroup.Label>Salasana uudelleen</WFAuthInputGroup.Label>
              <WFAuthInput
                required
                name='password2'
                placeholder='Salasana uudelleen'
                autoComplete='new-password'
                type='password'
                onChange={updateData}
                value={data.password2}
              />
              {status == 'password_mismatch' ? (
                <SubLabel>
                  <span className='text-red-400'>Salasanat eivät täsmää!</span>
                </SubLabel>
              ) : null}
            </WFAuthInputGroup>
          </WFAuthInputGroupWrapper>
          <WFAuthInputGroup>
            <WFAuthSubmitButton
              type='submit'
              disabled={status === 'loading' || status === 'success'}
              loading={status === 'loading'}>
              Rekisteröidy
            </WFAuthSubmitButton>
            <div className='w-full flex justify-center'>
              <Link
                href='/login'
                className='text-white'>
                Onko sinulla tili? Kirjaudu sisään.
              </Link>
            </div>
          </WFAuthInputGroup>
        </WFAuthForm>
      </WFAuthFormContainer>
    </WFAuthMain>
  );
}
