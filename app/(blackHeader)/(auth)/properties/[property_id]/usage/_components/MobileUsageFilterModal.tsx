'use client';

import Button from '@/components/UI/Button/Button';
import { CloseButton } from '@/components/UI/CloseButton';
import { Modal } from '@/components/UI/Modal';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { useQuery } from 'kotilogi-app/hooks/useQuery';
import { useEffect, useRef } from 'react';
import { useUsageProviderContext } from './UsageProvider';

export function MobileUsageFilterModal({ ...props }) {
  const { type, timestamps, displayYear: initialYear } = useUsageProviderContext();

  const { updateQueryDirectly: updateYearQuery } = useQuery('year', initialYear, 0);
  const { updateQueryDirectly: updateTypeQuery } = useQuery('type', type.toString(), 0);

  const yearSelectorRef = useRef<HTMLSelectElement>(null);
  const typeSelectorRef = useRef<HTMLSelectElement>(null);

  const types = [
    {
      value: 'all',
      text: 'Kaikki',
    },

    {
      value: 'heat',
      text: 'Lämmitys',
    },

    {
      value: 'water',
      text: 'Vesi',
    },

    {
      value: 'electric',
      text: 'Sähkö',
    },
  ];

  return (
    <Modal {...props}>
      <div className='flex flex-col rounded-lg bg-white w-full mx-2'>
        <Modal.Header>
          <h1 className='text-slate-500 text-xl'>Suodata kulutustiedot</h1>
          <VisibilityProvider.Trigger>
            <CloseButton />
          </VisibilityProvider.Trigger>
        </Modal.Header>

        <Modal.Body>
          <div className='flex flex-col gap-2'>
            <select
              className='w-full'
              ref={yearSelectorRef}>
              {timestamps.map(year => (
                <option
                  key={year}
                  value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              className='w-full'
              ref={typeSelectorRef}>
              {types.map(type => (
                <option
                  key={type.value}
                  value={type.value}>
                  {type.text}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <VisibilityProvider.Trigger>
            <Button variant='secondary'>Sulje</Button>
          </VisibilityProvider.Trigger>

          <VisibilityProvider.Trigger>
            <Button
              variant='primary-dashboard'
              onClick={() => {
                updateYearQuery(yearSelectorRef.current?.value);
                updateTypeQuery(typeSelectorRef.current?.value);
              }}>
              <span className='mx-8'>Lähetä</span>
            </Button>
          </VisibilityProvider.Trigger>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
