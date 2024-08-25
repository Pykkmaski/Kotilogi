'use client';

import { AUpdateEmail } from '@/actions/users';
import { FormBase } from '@/components/New/Forms/FormBase';
import { Main } from '@/components/New/Main';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { Heading } from '@/components/UI/Heading';
import Spinner from '@/components/UI/Spinner';
import { Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

enum FormStatus {
  IDLE = 0,
  UPDATING_EMAIL,
  UPDATING_PASSWORD,
}
export default function SettingsPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [formStatus, setFormStatus] = useState(FormStatus.IDLE);
  const loading = sessionStatus == 'loading';

  const updateEmail = (e: TODO) => {
    const email = e.target.email.value;
    setFormStatus(FormStatus.UPDATING_EMAIL);

    AUpdateEmail(session.user.email, email)
      .then(() => toast.success('Sähköpostiosoite päivitetty!'))
      .catch(() => toast.error('Sähköpostiosoitteen päivitys epäonnistui!'));

    setFormStatus(FormStatus.IDLE);
  };

  return (
    <Main>
      <Heading>Asetukset</Heading>
      {loading ? (
        <Spinner size='1rem' />
      ) : (
        <>
          <FormBase onSubmit={updateEmail}>
            <FormControl
              required
              label='Sähköpostiosoite'
              control={
                <Input
                  disabled={formStatus == FormStatus.UPDATING_EMAIL}
                  type='email'
                  defaultValue={session.user.email}
                  placeholder='Kirjoita sähköpostiosoitteesi...'
                />
              }
            />
            <div className='flex w-full justify-end'>
              <Button
                type='submit'
                variant='contained'
                startIcon={
                  formStatus == FormStatus.UPDATING_EMAIL ? <Spinner size='1rem' /> : <Check />
                }>
                Päivitä
              </Button>
            </div>
          </FormBase>
        </>
      )}
    </Main>
  );
}
