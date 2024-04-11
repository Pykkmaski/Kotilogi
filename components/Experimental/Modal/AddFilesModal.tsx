'use client';

import { forwardRef, useRef, useState } from 'react';
import Modal, { ModalRefType } from './Modal';
import { useAddDataModal } from './Modal.hooks';
import { CloseButton } from '@/components/CloseButton';
import Button from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import toast from 'react-hot-toast';
import { useInputFiles } from 'kotilogi-app/hooks/useInputFiles';

type AddFilesModalProps = {
  uploadMethod: (fdata: FormData[]) => Promise<void>;
  accept: string;
};

function AddFilesModal({ accept, uploadMethod }: AddFilesModalProps, ref: React.MutableRefObject<ModalRefType>) {
  const formRef = useRef<HTMLFormElement>(null);
  const { files, updateFiles } = useInputFiles();
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  const formId = `add-files-modal`;

  const uploadFiles = e => {
    e.preventDefault();
    setStatus('loading');

    uploadMethod(files)
      .catch(err => {
        toast.error(err.message);
      })
      .finally(() => {
        setStatus('idle');
        ref.current?.toggleOpen(false);
      });
  };

  const loading = status === 'loading';

  return (
    <Modal ref={ref}>
      <Modal.Header>
        <h1 className='text-xl text-slate-500'>Lisää Tiedostoja</h1>
        <Modal.CloseTrigger>
          <CloseButton />
        </Modal.CloseTrigger>
      </Modal.Header>

      <Modal.Body>
        <form ref={formRef} id={formId} onSubmit={uploadFiles} className='flex flex-col gap-4 md:w-[700px] xs:w-full'>
          <Input
            label='Tiedostot'
            description={accept === 'application/pdf' ? 'Valitse PDF-tiedostot' : 'Valitse kuvat'}
            type='file'
            name='file'
            accept={accept}
            multiple={true}
            required
            onChange={updateFiles}
          />
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Modal.CloseTrigger>
          <Button variant='secondary' disabled={loading}>
            <span>Sulje</span>
          </Button>
        </Modal.CloseTrigger>
        <Button variant='primary-dashboard' disabled={loading} loading={loading} form={formId}>
          <span className='mx-8'>Lähetä</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default forwardRef(AddFilesModal);
