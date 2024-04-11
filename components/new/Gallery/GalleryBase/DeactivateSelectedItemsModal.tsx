import { CloseButton } from '@/components/CloseButton';
import Modal, { ModalRefType } from '@/components/Experimental/Modal/Modal';
import { MutableRefObject, forwardRef, useState } from 'react';
import { useGalleryContext } from './Gallery';
import Button from '@/components/Button/Button';
import toast from 'react-hot-toast';
import { ErrorMessage, Group } from '@/components/Util/FormUtils';
import { Input } from '@/components/Input/Input';
import { useInputData } from 'kotilogi-app/hooks/useInputFiles';

type DeactivateSelectedItemsModal = {
  deactivationMethod: <T extends Kotilogi.ItemType>(item: T, password: string) => Promise<void>;
};

function DeactivateSelectedItemsModal({ deactivationMethod }: DeactivateSelectedItemsModal, ref: MutableRefObject<ModalRefType>) {
  const { state, dispatch } = useGalleryContext();
  const [status, setStatus] = useState<'idle' | 'loading' | 'invalid_password'>('idle');
  const { data, updateData } = useInputData({});

  const loading = status === 'loading';
  const formId = `deactivate-targets-form`;

  const deactivate = async () => {
    setStatus('loading');
    const promises = state.selectedItems.map(item => deactivationMethod(item, data.password));
    await Promise.all(promises)
      .then(() => {
        setStatus('idle');
        dispatch({
          type: 'reset_selected',
        });
        toast.success('Kohde poistettu käytöstä!');
        ref.current?.toggleOpen(false);
      })
      .catch(err => {
        const msg = err.message.toLowerCase();
        if (msg.includes('password')) {
          setStatus('invalid_password');
        } else {
          toast.error('Joidenkin kohteiden käytöstä poisto epäonnistui!');
          setStatus('idle');
          ref.current?.toggleOpen(false);
        }
      });
  };

  return (
    <Modal ref={ref}>
      <Modal.Header>
        <h1 className='text-lg'>Poista käytöstä</h1>
        <Modal.CloseTrigger>
          <CloseButton />
        </Modal.CloseTrigger>
      </Modal.Header>

      <Modal.Header>
        <form className='flex flex-col text-slate-500 lg:w-[700px] xs:w-full py-4' id={formId}>
          <div className='flex flex-col mb-8'>
            <p>Olet poistamassa seuraavia kohteita käytöstä:</p>

            <ul className='font-semibold my-4'>
              {state.selectedItems.map(item => (
                <li>{item.title}</li>
              ))}
            </ul>

            <p>
              Käytöstä poisto tarkoittaa, ettet enää saa laskua vuosittain veloittavista kohteista Kotidokissa.
              <br />
              Käytöstä poistettuja kohteita ei voi muokata.
              <br />
              Kohteiden uudelleen aktivointi maksaa <span className='text-green-700'>49,90€</span>
            </p>
          </div>

          <Group>
            <Input label='Salasana' placeholder='Kirjoita salasanasi...' autoComplete='new-password' name='password' type='password' onInput={updateData} required />
            {status === 'invalid_password' ? <ErrorMessage>Salasana on väärä</ErrorMessage> : null}
          </Group>
        </form>
      </Modal.Header>

      <Modal.Footer>
        <Modal.CloseTrigger>
          <Button variant='secondary' disabled={loading}>
            Sulje
          </Button>
        </Modal.CloseTrigger>

        <Button variant='primary-dashboard' loading={loading} disabled={loading} onClick={deactivate} form={formId}>
          <span className='mx-8'>Poista käytöstä</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default forwardRef(DeactivateSelectedItemsModal);
