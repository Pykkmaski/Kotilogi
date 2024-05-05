'use client';

import { Modal } from '@/components/UI/Modal';
import Image from 'next/image';
import Link from 'next/link';

export function AddPropertySuccessModal(props) {
  return (
    <Modal hidden={props.hidden}>
      <Modal.DefaultContentContainer>
        <Modal.HeaderWithTitle
          title='Kohde lisätty'
          icon='fa-check'
        />
        <Modal.Body>
          <div className='flex h-[400px] relative'>
            <div className='bg-balloons absolute top-0 right-0 w-[70%] h-full bg-center opacity-10' />
            <div className='flex flex-col gap-4 text-slate-600 z-10'>
              <h1 className='text-2xl mb-4'>
                Onneksi olkoon! Olet lisännyt ensimmäisen kohteesi Kotidok:iin!
              </h1>

              <div className='flex justify-between w-full'>
                <p className='xs:text-base lg:text-lg'>
                  Tapahtumasta on luotu lasku ostoskoriisi. <br />
                  Sinulla on 30 päivää aikaa maksaa tapahtuma. Kohde lukitaan, mikäli laskua ei
                  makseta eräpäivään mennessä.
                  <br />
                  Lukitut kohteet poistetaan palvelusta kuukauden kuluttua.
                </p>
              </div>

              <div className='flex flex-row text-orange-500'>
                <Link href='/dashboard/cart'>Siirry ostoskoriin</Link>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal.DefaultContentContainer>
    </Modal>
  );
}
