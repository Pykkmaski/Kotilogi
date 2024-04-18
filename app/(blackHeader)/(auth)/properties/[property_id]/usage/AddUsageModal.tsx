'use client';

import { MutableRefObject, forwardRef, useRef, useState } from 'react';
import { usePropertyContext } from '../_util/PropertyContextProvider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ModalRefType } from '@/components/Experimental/Modal/Modal';
import * as usage from '@/actions/usage';
import { default as ExperimentalModal } from '@/components/Experimental/Modal/Modal';
import { Icon } from '@/components/UsagePage/Icon';
import { Input, Select } from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { CloseButton } from '@/components/CloseButton';
import { useInputData } from 'kotilogi-app/hooks/useInputFiles';

function AddUsageModal(props, ref: MutableRefObject<ModalRefType>) {
  const { property } = usePropertyContext();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const type = searchParams.get('type') as Kotidok.UsageTypeType | 'all';

  const initialData = { refId: property.id, type: type !== 'all' ? type : 'heat' };
  const { updateData, data, reset: resetInputData } = useInputData(initialData);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement | null>(null);

  const formId = `${props.id}-form`;

  const loading = status === 'loading';

  const closeModal = () => {
    formRef.current?.reset();
    resetInputData(initialData);
    ref.current?.toggleOpen(false);
  };

  const submitUsageData = e => {
    e.preventDefault();
    setStatus('loading');

    const dataToAdd = {
      ...data,
      type: type !== 'all' ? type : e.target.type.value,
    };

    usage
      .add(dataToAdd)
      .then(() => {
        //Route to the same year as the year of the newly added data.
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('year', new Date(dataToAdd.time).getFullYear().toString());
        const url = `${pathName}?${newSearchParams.toString()}`;
        router.replace(url);
      })
      .catch(err => {
        if (err.message === 'invalid_date') {
          toast.error('Tiedon päiväys ei voi olla tulevaisuudessa!');
        } else {
          toast.error('Tuntematon virhe!');
        }
      })
      .finally(() => {
        closeModal();
        setStatus('idle');
      });
  };

  return (
    <ExperimentalModal ref={ref}>
      <ExperimentalModal.Header>
        <div className='w-full flex gap-2 items-center'>
          {type !== 'all' ? <Icon type={type} /> : null}
          <span>Lisää Kulutustieto</span>
        </div>

        <ExperimentalModal.CloseTrigger>
          <CloseButton />
        </ExperimentalModal.CloseTrigger>
      </ExperimentalModal.Header>

      <ExperimentalModal.Body>
        <form id={formId} onSubmit={submitUsageData} className='flex flex-col gap-4 md:w-[800px] xs:w-full' ref={formRef}>
          {type === 'all' ? (
            <Select
              label='Tyyppi'
              description='Kulutustiedon tyyppi.'
              name='type'
              required={true}
              onChange={e => {
                updateData(e);
              }}>
              <option value='heat' selected={true}>
                Lämmityskulu
              </option>
              <option value='water'>Vesikulu</option>
              <option value='electric'>Sähkökulu</option>
            </Select>
          ) : null}

          <Input name='price' label='Laskun Hinta' description='Laskun hinta euroissa.' onChange={updateData} placeholder='Kirjoita laskun hinta...' type='number' required />

          <Input name='time' label='Laskun päiväys' description='Laskun päivämäärä.' placeholder='Kirjoita laskun päivämäärä...' onChange={updateData} type='date' required />
        </form>
      </ExperimentalModal.Body>

      <ExperimentalModal.Footer>
        <div className='flex gap-4'>
          <ExperimentalModal.CloseTrigger>
            <Button variant='secondary'>Sulje</Button>
          </ExperimentalModal.CloseTrigger>

          <Button type='submit' loading={loading} disabled={loading} form={formId} variant='primary-dashboard'>
            <span className='mx-8'>Lähetä</span>
          </Button>
        </div>
      </ExperimentalModal.Footer>
    </ExperimentalModal>
  );
}

export default forwardRef(AddUsageModal);
