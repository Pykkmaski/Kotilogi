'use client';

import { PrimaryButton } from '@/components/UI/Button/PrimaryButton';
import { SecondaryButton } from '@/components/UI/Button/SecondaryButton';
import { Group } from '@/components/UI/Group';
import { Input } from '@/components/Feature/Input';
import { useRef } from 'react';
import { z } from 'zod';
import { ErrorText } from '@/components/UI/Text';
import { usePasswordSettingsForm } from './usePasswordSettingsForm';

const PasswordSchema = z.object({
  password1: z.string(),
  password2: z.string(),
  password3: z.string(),
});

export function PasswordSettingsForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { status, data, updateData, resetPasswordHandler, resetForm } =
    usePasswordSettingsForm(formRef);

  const hasAllFieldsFilled = () => {
    return data.password1 && data.password2 && data.oldPassword;
  };

  const hasSomeInput = () => data.password1 || data.password2 || data.oldPassword;

  const submitDisabled = status === 'loading' || status === 'success';

  return (
    <form
      onSubmit={resetPasswordHandler}
      ref={formRef}>
      <div className='flex flex-col gap-4'>
        <Input
          type='password'
          placeholder='Kirjoita uusi salasana...'
          autoComplete='new-password'
          name='password1'
          onChange={updateData}
          label='Uusi Salasana'
          description='Päivitä salasanasi.'
          required={true}
        />

        <div className='flex flex-col gap-2'>
          <Input
            type='password'
            placeholder='Kirjoita uusi salasana uudelleen...'
            autoComplete='off'
            name='password2'
            onChange={updateData}
            label='Salasanan Vahvistus'
            description='Vahvista uusi salasana.'
            required={true}
          />

          {status === 'password_mismatch' ? (
            <div className='flex w-full text-sm justify-end'>
              <ErrorText>Salasanat eivät täsmää!</ErrorText>
            </div>
          ) : null}
        </div>

        <div className='flex flex-col gap-2'>
          <Input
            type='password'
            placeholder='Kirjoita nykyinen salasanasi...'
            autoComplete='off'
            name='oldPassword'
            onChange={updateData}
            label='Nykyinen salasanasi'
            description='Vahvista nykyinen salasanasi.'
            required={true}
          />

          {status === 'invalid_password' ? (
            <div className='w-full flex justify-end text-sm'>
              <ErrorText>Salasana on väärä!</ErrorText>
            </div>
          ) : null}
        </div>

        <div className='w-full'>
          <Group
            direction='row'
            justify='end'
            gap={4}>
            <SecondaryButton
              hidden={!hasSomeInput() || status === 'loading'}
              onClick={resetForm}
              type='button'>
              Tyhjennä
            </SecondaryButton>
            <PrimaryButton
              type='submit'
              disabled={submitDisabled || !hasAllFieldsFilled()}
              loading={status === 'loading'}>
              Päivitä Salasana
            </PrimaryButton>
          </Group>
        </div>
      </div>
    </form>
  );
}
