'use client';

import { addProperty } from '@/actions/experimental/properties';
import { AddButton } from '@/components/Feature/GalleryBase/Buttons';
import { Input } from '@/components/Feature/Input';
import { SubmitDataModalProvider } from '@/components/Feature/SubmitDataModal';
import Button from '@/components/UI/Button/Button';
import { Modal } from '@/components/UI/Modal';
import { CarouselProvider } from '@/components/Util/CarouselProvider';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import toast from 'react-hot-toast';

function IconBox({ children, subtitle, bgColor, ...props }) {
  const className = [
    `flex flex-col items-center justify-center aspect-square rounded-lg shadow-lg p-4 text-4xl cursor-pointer text-white`,
    `bg-${bgColor}`,
  ];
  return (
    <div
      {...props}
      className={className.join(' ')}>
      {children}
      <h1 className='text-lg'>{subtitle}</h1>
    </div>
  );
}

export function NewAddPropertyModalTrigger() {
  return (
    <VisibilityProvider>
      <VisibilityProvider.Trigger>
        <AddButton />
      </VisibilityProvider.Trigger>

      <VisibilityProvider.Target>
        <SubmitDataModalProvider
          submitMethod={async (data, files?) => {
            await addProperty(data)
              .then(() => {
                toast.success('Talo lisätty onnistuneesti!');
              })
              .catch(err => toast.error(err.message));
          }}>
          <CarouselProvider defaultSlot='start'>
            <Modal.DefaultContentContainer>
              <Modal.HeaderWithTitle
                title='Lisää Talo'
                icon='fa-home'
              />

              <Modal.Body>
                <CarouselProvider.Slot slotName='start'>
                  <div className='w-full flex flex-col gap-2'>
                    <h1 className='text-xl'>Lisää talo</h1>
                    <div className='flex flex-row gap-4 border-b border-b-slate-200 pb-4'>
                      <p className='mr-auto'>
                        Voit lisätä kahden eri tyyppisen kohteen. Kiinteistöt ovat omistuksessasi
                        olevia rakennuksia, huoneistot taas jonkun toisen omistuksessa olevan
                        rakennuksen osia.
                      </p>
                      <CarouselProvider.SelectSlotTrigger slotToSelect='building'>
                        <IconBox
                          bgColor='blue-500'
                          subtitle='Kiinteistö'
                          title='Lisää kiinteistö...'>
                          <i className='fa fa-home text-white' />
                        </IconBox>
                      </CarouselProvider.SelectSlotTrigger>

                      <CarouselProvider.SelectSlotTrigger slotToSelect='apt'>
                        <IconBox
                          bgColor='red-500'
                          subtitle='Huoneisto'
                          title='Lisää huoneisto...'>
                          <i className='fa fa-square text-white' />
                        </IconBox>
                      </CarouselProvider.SelectSlotTrigger>
                    </div>

                    <h1 className='text-xl'>Onko sinulla varmenne?</h1>
                    <div className='flex flex-row'>
                      <p className='mr-auto'>
                        Siirrä kohde itsellesi käyttäen sinulle annettua varmennetta.
                      </p>
                      <CarouselProvider.SelectSlotTrigger slotToSelect='transfer'>
                        <IconBox
                          bgColor='yellow-500'
                          title='Lisää varmenteella...'
                          subtitle='Varmenne'>
                          <i className='fa fa-key text-white' />
                        </IconBox>
                      </CarouselProvider.SelectSlotTrigger>
                    </div>
                  </div>
                </CarouselProvider.Slot>
              </Modal.Body>

              <Modal.Footer>
                <CarouselProvider.HideOnSlot slotToHideOn='start'>
                  <CarouselProvider.SelectSlotTrigger slotToSelect='start'>
                    <button>Takaisin alkuun</button>
                  </CarouselProvider.SelectSlotTrigger>
                </CarouselProvider.HideOnSlot>

                <VisibilityProvider.Trigger>
                  <Button variant='primary-dashboard'>
                    <span className='mx-4'>Sulje</span>
                  </Button>
                </VisibilityProvider.Trigger>
              </Modal.Footer>
            </Modal.DefaultContentContainer>
          </CarouselProvider>
        </SubmitDataModalProvider>
      </VisibilityProvider.Target>
    </VisibilityProvider>
  );
}
