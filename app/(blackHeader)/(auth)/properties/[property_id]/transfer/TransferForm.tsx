'use client';

import Button from '@/components/UI/Button/Button';
import { Description, ErrorMessage, Group, Input, Label } from '@/components/UI/FormUtils';
import { ACreateTransferToken } from 'kotilogi-app/actions/experimental/properties';
import { isUserValid } from 'kotilogi-app/actions/users';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type TransferFormProps = {
  property: Kotidok.PropertyType;
  user: {
    email: string;
  };
};

export function TransferForm({ property, user }: TransferFormProps) {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'key_copied' | 'invalid_password'
  >('idle');

  const [receiverEmail, setReceiverEmail] = useState('');
  const [emailValid, setEmailValid] = useState<'undetermined' | 'valid' | 'invalid'>(
    'undetermined'
  );
  const [key, setKey] = useState<string | null>(null);

  const copyKeyToClipboard = () => {
    navigator.clipboard.writeText(key);
    toast.success('Varmenne kopioitu leikepöydälle!');
    setStatus('key_copied');
  };

  const generateKey = async e => {
    e.preventDefault();
    setStatus('loading');
  };

  const checkUserValidity = async () => {
    if (receiverEmail.length === 0) {
      setEmailValid('undetermined');
    } else {
      await isUserValid(receiverEmail).then(result => {
        if (result === true) {
          setEmailValid(() => 'valid');
        } else {
          setEmailValid(() => 'invalid');
        }
      });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkUserValidity();
    }, 100);
    return () => clearTimeout(timeout);
  }, [receiverEmail]);

  const isLoading = status === 'loading';

  return (
    <div className='flex flex-col gap-4'>
      <form
        className='flex flex-col gap-4'
        onSubmit={generateKey}>
        <Group>
          <Label>Vastaanottaja</Label>
          <Input
            icon={
              emailValid === 'valid' ? (
                <i
                  className='fa fa-check text-green-500'
                  title='Käyttäjä annetulla osoitteella on olemassa.'></i>
              ) : emailValid === 'invalid' ? (
                <i
                  className='fa fa-times text-red-500 z-10'
                  title='Käyttäjää annetulla osoitteella ei ole!'></i>
              ) : null
            }
            required
            type='email'
            name='receiver'
            placeholder='Kirjoita vastaanottajan sähköpostiosoite...'
            onChange={e => {
              setReceiverEmail(e.target.value);
            }}></Input>
          <Description>
            Osoitteen tulee olla Kotidokiin rekisteröidyn käyttäjän sähköpostiosoite.
          </Description>
        </Group>

        <Group>
          <Label>Salasana</Label>
          <Input
            required
            type='password'
            name='password'
            placeholder='Kirjoita salasanasi...'
            autoComplete='new-password'
          />
          {status === 'invalid_password' ? (
            <ErrorMessage>Salasana on virheellinen!</ErrorMessage>
          ) : null}
        </Group>

        <div className='flex justify-between'>
          <Label>Ymmärrän, että siirto on pysyvä:</Label>
          <input
            required
            type='checkbox'
            className='aspect-square w-5'
          />
        </div>

        <div className='mt-8 flex flex-row gap-2'>
          {status === 'success' || status === 'key_copied' ? (
            <div className='flex flex-row gap-2 items-center'>
              <Button
                variant='primary'
                type='button'
                onClick={copyKeyToClipboard}
                disabled={status === 'key_copied'}>
                Kopioi leikepöydälle
              </Button>

              {status === 'key_copied' ? <i className='fa fa-check text-green-500' /> : null}
            </div>
          ) : (
            <Button
              variant='primary-dashboard'
              type='submit'
              loading={isLoading}
              disabled={isLoading || !emailValid}>
              Luo Varmenne
            </Button>
          )}
        </div>
      </form>

      {status === 'success' || status === 'key_copied' ? (
        <div className='text-slate-500 flex flex-col gap-2'>
          <h2 className='text-xl font-semibold mt-4'>Varmenne luotu!</h2>
          <p>
            Varmenne kohteen omistajan vaihtoa varten on luotu onnistuneesti!
            <br />
            Kopioi varmenne leikepöydälle painamalla "Kopioi leikepöydälle"-painiketta. <br />
            Voit lähettää varmenteen valitsemallesi vastaanottajalle haluamallasi tavalla
            (sähköposti, yms.). Älä jaa varmennetta julkisesti!
          </p>
        </div>
      ) : null}
    </div>
  );
}
