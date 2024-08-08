'use client';

import { useRef, useState } from 'react';
import { sendContactMessage } from 'kotilogi-app/actions/email/sendContactMessage';
import toast from 'react-hot-toast';
import { PrimaryButton } from '@/components/UI/Button/PrimaryButton';
import { ErrorText } from '@/components/UI/Text';
import Spinner from '@/components/UI/Spinner';
import Button from '@/components/UI/Button/Button';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { Textarea } from '@/components/Feature/Input';

function ContactForm(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(-1);
  const formRef = useRef<HTMLFormElement | null>(null);

  const messageLength = useRef(0);

  async function onSubmitHandler(e) {
    e.preventDefault();
    setLoading(true);

    const messageData = {
      name: e.target.name.value,
      message: e.target.message.value,
      email: e.target.email.value,
    };

    sendContactMessage(messageData)
      .then(() => {
        if (formRef.current) {
          formRef.current.reset();
        }

        setError(0);
      })
      .catch(err => toast.error(err.message))
      .finally(() => setLoading(false));
  }

  const FormGroup = ({ children }) => (
    <div className='flex flex-col gap-2 text-slate-500'>{children}</div>
  );

  const FormLabel = ({ children }) => {
    return <label className='text-white'>{children}</label>;
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col gap-4 md:w-[600px] xs:w-full text-white'
      ref={formRef}>
      <FormControl
        label='Nimesi'
        control={
          <Input
            type='text'
            name='name'
            id='contact-name-input'
            placeholder='Kirjoita nimesi...'
          />
        }
      />

      <FormControl
        label='Sähköpostiosoitteesi'
        required
        control={
          <Input
            type='email'
            name='email'
            id='contact-email-input'
            placeholder='Kirjoita sähköpostiosoitteesi...'
          />
        }
      />

      <FormControl
        label='Viesti'
        required
        control={
          <textarea
            name='message'
            id='contact-message-input'
            placeholder='Kirjoita viestisi...'
          />
        }
      />

      <div className='w-full'>
        <Button
          variant='primary'
          type='submit'
          id='contact-submit-button'
          className='w-full text-center text-white justify-center font-semibold'>
          Lähetä
        </Button>
      </div>

      {loading ? <Spinner size='2rem'></Spinner> : <></>}

      {error === 0 ? (
        <span className='text-white w-full text-center'>Viesti lähetetty!</span>
      ) : error === 500 ? (
        <ErrorText>Jotain meni pieleen! Yritä myöhemmin uudelleen.</ErrorText>
      ) : (
        <></>
      )}
    </form>
  );
}

export default ContactForm;
