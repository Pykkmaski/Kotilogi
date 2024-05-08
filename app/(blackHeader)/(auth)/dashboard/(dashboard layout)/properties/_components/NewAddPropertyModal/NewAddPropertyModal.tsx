'use client';

import { AddButton } from '@/components/Feature/GalleryBase/Buttons';
import { Modal } from '@/components/UI/Modal';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { useInputData } from '@/hooks/useInputData';
import { createContext, useId, useState } from 'react';
import Button from '@/components/UI/Button/Button';
import { SubmitForm } from './Form/PropertyForm';
import toast from 'react-hot-toast';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';

const AddPropertyModalContext = createContext<{
  property: Kotidok.PropertyType;
  updateData: (data: Kotidok.PropertyType) => void;
} | null>(null);
export const useAddPropertyModalContext = createUseContextHook(
  'AddPropertyModalContext',
  AddPropertyModalContext
);

export function NewAddPropertyModalTrigger({
  property,
  onSubmit,
}: {
  property?: Kotidok.PropertyType;
  onSubmit: (data: Kotidok.PropertyType) => Promise<void>;
}) {
  const { data, updateData } = useInputData(property || ({} as Kotidok.PropertyType));

  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  const [showModal, setShowModal] = useState(false);

  const formId = useId();
  const loading = status === 'loading';

  const displayModal = (state?: boolean) => {
    setShowModal(prev => {
      if (state !== undefined) {
        return state;
      }

      return !prev;
    });
  };
  return (
    <VisibilityProvider
      visible={showModal}
      toggleOverride={displayModal}>
      <VisibilityProvider.Trigger>
        <AddButton />
      </VisibilityProvider.Trigger>

      <VisibilityProvider.Target>
        <Modal>
          <Modal.DefaultContentContainer>
            <Modal.HeaderWithTitle
              title={property ? 'Muokkaa kohdetta' : 'Lisää kohde'}
              icon='fa-home'
            />

            <AddPropertyModalContext.Provider
              value={{
                property: data,
                updateData,
              }}>
              <Modal.Body>
                <SubmitForm
                  onChange={updateData}
                  onSubmit={async e => {
                    e.preventDefault();
                    setStatus('loading');

                    const dataToSubmit = {
                      ...data,
                      propertyNumber:
                        data.targetType === 'Kiinteistö' ? data.propertyNumber : undefined,
                      appartmentNumber:
                        data.targetType === 'Huoneisto' ? data.appartmentNumber : undefined,
                      yardArea: data.yardOwnership !== 'Ei Mitään' ? data.yardArea : undefined,
                    };

                    onSubmit(dataToSubmit)
                      .then(() => {
                        setStatus('idle');
                        displayModal(false);
                      })
                      .catch(err => toast.error(err.message));
                  }}
                  id={formId}
                />
              </Modal.Body>
            </AddPropertyModalContext.Provider>

            <Modal.Footer>
              <VisibilityProvider.Trigger>
                <Button variant='secondary'>Peruuta</Button>
              </VisibilityProvider.Trigger>

              <Button
                variant='primary-dashboard'
                type='submit'
                form={formId}
                loading={loading}
                disabled={loading}>
                <span className='mx-2'>Vahvista</span>
              </Button>
            </Modal.Footer>
          </Modal.DefaultContentContainer>
        </Modal>
      </VisibilityProvider.Target>
    </VisibilityProvider>
  );
}
