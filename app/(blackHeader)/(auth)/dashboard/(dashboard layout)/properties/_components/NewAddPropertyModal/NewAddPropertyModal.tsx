'use client';

import { AddButton } from '@/components/Feature/GalleryBase/Buttons';
import { Modal } from '@/components/UI/Modal';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import style from './style.module.css';
import { useInputData } from '@/hooks/useInputData';
import { useEffect, useId, useState } from 'react';
import Button from '@/components/UI/Button/Button';
import { TargetTypeField } from './Form/TargetTypeField';
import { GeneralField } from './Form/GeneralField';
import { InteriorField } from './Form/InteriorField';
import { HeatingField } from './Form/HeatingField';
import { OtherInfoField } from './Form/OtherInfoField';
import { ObjectProvider } from '@/components/Util/ObjectProvider';
import { SubmitForm } from './Form/PropertyForm';
import { CarouselProvider } from '@/components/Util/CarouselProvider';
import toast from 'react-hot-toast';

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
            <CarouselProvider defaultSlot='form'>
              <ObjectProvider obj={data}>
                <Modal.Body>
                  <CarouselProvider.Slot slotName='form'>
                    <SubmitForm
                      onChange={updateData}
                      onSubmit={async e => {
                        e.preventDefault();
                        setStatus('loading');

                        onSubmit(data)
                          .then(() => {
                            setStatus('idle');
                            displayModal(false);
                          })
                          .catch(err => toast.error(err.message));
                      }}
                      id={formId}
                    />
                  </CarouselProvider.Slot>

                  <CarouselProvider.Slot slotName='confirmation'>
                    <h1>Vahviastus</h1>
                    <CarouselProvider.PreviousTrigger>Takaisin</CarouselProvider.PreviousTrigger>
                  </CarouselProvider.Slot>
                </Modal.Body>
              </ObjectProvider>

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
            </CarouselProvider>
          </Modal.DefaultContentContainer>
        </Modal>
      </VisibilityProvider.Target>
    </VisibilityProvider>
  );
}
