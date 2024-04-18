import toast from 'react-hot-toast';
import { PrimaryButton } from '../Button/PrimaryButton';
import { SecondaryButton } from '../Button/SecondaryButton';
import { Group } from '../Group';
import { useStatus } from './BaseAddModal.hooks';
import Modal, { ModalProps } from './Modal';
import Button from '../Button/Button';

export type DeleteModalProps<T extends Kotidok.ItemType> = ModalProps & {
  targetsToDelete: T[];
  resetSelectedTargets: () => void;
  deleteMethod: (item: T) => Promise<void>;
};

export function DeleteModal<T extends Kotidok.ItemType>({ targetsToDelete, resetSelectedTargets, deleteMethod, ...props }: DeleteModalProps<T>) {
  const [status, setStatus] = useStatus('idle');

  const deleteItems = async () => {
    setStatus('loading');
    try {
      const promises: Promise<void>[] = [];
      for (const item of targetsToDelete) {
        promises.push(deleteMethod(item));
      }

      await Promise.all(promises);

      setStatus('success');
      resetSelectedTargets();
      props.onHide();
    } catch (err) {
      toast.error(err.message);
      setStatus('error');
    }
  };

  const cancelDelete = () => {
    //resetSelectedTargets();
    props.onHide();
  };

  const loading = status === 'loading';

  return (
    <Modal {...props}>
      <Modal.Header>Poista</Modal.Header>
      <Modal.Body>
        <div className='flex flex-col mx-8'>
          <p>Olet poistamassa seuraavia kohteita:</p>
          <ul>
            {targetsToDelete.map(target => {
              const content = target.title;
              return <li className='font-semibold'>{content}</li>;
            })}
          </ul>

          <p>Oletko varma?</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' disabled={loading} onClick={cancelDelete}>
          <span className='mx-4'>Ei</span>
        </Button>

        <Button variant='primary' loading={loading} disabled={loading} onClick={deleteItems}>
          <span className='mx-4'>Kyllä</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
