import { useState } from 'react';
import { SingleInputFormProvider } from './Util/SingleInputFormProvider';
import Button from './Button/Button';
import toast from 'react-hot-toast';

type NewSingleInputFormProps = React.ComponentProps<'form'> & {
  editingEnabled?: boolean;
  submitMethod: (value: any) => Promise<void>;
};

export function NewSingleInputForm({ editingEnabled, ...props }: NewSingleInputFormProps) {
  const [status, setStatus] = useState<'idle' | 'editing' | 'loading'>('idle');
  const loading = status === 'loading';

  const submit = async e => {
    e.preventDefault();
    setStatus('loading');

    props
      .submitMethod(e.target.value)
      .catch(err => toast.error('Tiedon päivitys epäonnistui!'))
      .finally(() => setStatus('idle'));
  };

  return (
    <SingleInputFormProvider {...props} onSubmit={submit}>
      <div className='flex flex-col gap-2 w-full items-end'>
        {/**Only shown when editing is enabled. */}
        <SingleInputFormProvider.SubmitButton>
          <Button variant='primary-dashboard' loading={loading} disabled={loading} hidden={!editingEnabled}>
            <span className='mx-4'>Päivitä</span>
          </Button>
        </SingleInputFormProvider.SubmitButton>
      </div>
    </SingleInputFormProvider>
  );
}

NewSingleInputForm.Input = SingleInputFormProvider.Input;
