'use client';

import Button from '@/components/Button/Button';
import { CloseButton } from '@/components/CloseButton';
import Modal, { ModalRefType } from '@/components/Experimental/Modal/Modal';
import { MutableRefObject, forwardRef, useRef, useState } from 'react';
import { Input } from '../Input/Input';
import { useItemContext } from './DataList';
import * as usage from '@/actions/usage';
import toast from 'react-hot-toast';
import SubmitDataModal from '../Experimental/Modal/SubmitDataModal';

function EditUsageModal(props, ref: MutableRefObject<ModalRefType>) {
  const { item } = useItemContext();

  return (
    <SubmitDataModal
      ref={ref}
      submitMethod={async data => {
        const d = {
          ...item,
          ...data,
        };

        console.log(d);
        await usage.update(d).catch(err => toast.error(err.message));
      }}>
      <Modal.Header>
        <h1 className='text-xl text-slate-500'>Muokkaa tietoa</h1>
        <Modal.CloseTrigger>
          <CloseButton />
        </Modal.CloseTrigger>
      </Modal.Header>

      <Modal.Body>
        <SubmitDataModal.Form>
          <Input label='Hinta' description='Laskun hinta.' name='price' type='number' step='0.01' min='0.01' defaultValue={item.price} />
        </SubmitDataModal.Form>
      </Modal.Body>

      <Modal.Footer>
        <SubmitDataModal.CloseTrigger>
          <Button variant='secondary'>Peruuta</Button>
        </SubmitDataModal.CloseTrigger>

        <SubmitDataModal.SubmitTrigger>
          <Button variant='primary-dashboard'>
            <span className='mx-8'>Lähetä</span>
          </Button>
        </SubmitDataModal.SubmitTrigger>
      </Modal.Footer>
    </SubmitDataModal>
  );
}

export default forwardRef(EditUsageModal);
