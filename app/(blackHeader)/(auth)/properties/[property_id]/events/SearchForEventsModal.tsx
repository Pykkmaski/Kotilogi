'use client';
import Button from '@/components/Button/Button';
import { CloseButton } from '@/components/CloseButton';
import { Modal } from '@/components/Experimental/Modal/PlainModal/Modal';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { useQuery } from 'kotilogi-app/hooks/useQuery';
import { useRef } from 'react';

export function SearchForEventsModal({ hidden }: React.ComponentProps<'div'>) {
  const { updateQueryDirectly } = useQuery('q', null, 0);
  const inputRef = useRef<HTMLInputElement>(null);

  const search = () => {
    const query = inputRef.current?.value;
    updateQueryDirectly(query);
  };

  return (
    <Modal hidden={hidden}>
      <div className='flex flex-col bg-white rounded-lg xs:w-full xs:mx-2 lg-w-[800px]'>
        <Modal.Header>
          <h1 className='text-xl text-slate-500'>Etsi Tapahtumia</h1>
          <VisibilityProvider.Trigger>
            <CloseButton />
          </VisibilityProvider.Trigger>
        </Modal.Header>
        <Modal.Body>
          <input
            className='w-full text-black'
            type='search'
            placeholder='Etsi tapahtumista...'
            ref={inputRef}
          />
        </Modal.Body>

        <Modal.Footer>
          <VisibilityProvider.Trigger>
            <Button variant='secondary'>Peruuta</Button>
            <Button variant='primary-dashboard' onClick={search}>
              <span className='mx-8'>Etsi</span>
            </Button>
          </VisibilityProvider.Trigger>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
