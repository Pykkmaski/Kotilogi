import Button from './Button/Button';
import { Modal } from './Experimental/Modal/PlainModal/Modal';
import { VisibilityProvider } from './Util/VisibilityProvider';

type ConfirmModalProps = React.PropsWithChildren & {
  title: string;
  onConfirm: () => Promise<void> | void;
  hidden?: boolean;
};

export function ConfirmModal({ children, title, hidden, onConfirm }: ConfirmModalProps) {
  return (
    <Modal hidden={hidden}>
      <Modal.HeaderWithTitle title={title} />
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <VisibilityProvider.Trigger>
          <Button variant='secondary'>Ei</Button>
        </VisibilityProvider.Trigger>

        <Button
          variant='primary-dashboard'
          type='button'
          onClick={onConfirm}>
          <span className='mx-4'>Kyllä</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
