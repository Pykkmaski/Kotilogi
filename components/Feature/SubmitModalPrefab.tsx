'use client';

import { useToggle } from 'kotilogi-app/hooks/useToggle';
import { Modal } from '../UI/Modal';
import { SubmitDataModalProvider } from './SubmitDataModal';
import { VisibilityProvider } from '../Util/VisibilityProvider';
import { useEffect } from 'react';

type SubmitModalPrefabProps<T> = React.PropsWithChildren & {
  trigger: JSX.Element;
  modalTitle: string;
  submitMethod: (data: T, files?: FormData[]) => Promise<void>;
  submitText?: string;
  cancelText?: string;
  icon: string;
};

/**Renders a trigger, that when pressed, reveals a SubmitDataModal, containing the passed children in its form. */
export function SubmitModalPrefab<T>({
  children,
  trigger,
  modalTitle,
  cancelText = 'Peruuta',
  submitText = 'Lähetä',
  icon,
  submitMethod,
}: SubmitModalPrefabProps<T>) {
  const { state: visible, toggleState } = useToggle(false);

  const submit = async (data: T, files?: FormData[]) => {
    await submitMethod(data, files).then(() => {
      toggleState(false);
    });
  };

  return (
    <VisibilityProvider
      visible={visible}
      toggleOverride={toggleState}>
      <VisibilityProvider.Trigger>{trigger}</VisibilityProvider.Trigger>
      <VisibilityProvider.Target>
        <SubmitDataModalProvider submitMethod={submit}>
          <Modal.DefaultContentContainer>
            <Modal.HeaderWithTitle
              title={modalTitle}
              icon={icon}
            />
            <SubmitDataModalProvider.Form>{children}</SubmitDataModalProvider.Form>
            <SubmitDataModalProvider.Footer
              submitText={submitText}
              cancelText={cancelText}
            />
          </Modal.DefaultContentContainer>
        </SubmitDataModalProvider>
      </VisibilityProvider.Target>
    </VisibilityProvider>
  );
}
