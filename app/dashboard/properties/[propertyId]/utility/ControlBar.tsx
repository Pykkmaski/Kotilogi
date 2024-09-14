'use client';

import { ScrollOnX } from '@/components/New/ScrollOnX';
import { TimeframeSelector } from './TimeframeSelector';
import { TypeSelector } from './TypeSelector';
import { Button, IconButton } from '@mui/material';
import { Add, Clear, MoreVert } from '@mui/icons-material';
import Link from 'next/link';
import { useUtilityProviderContext } from './UtilityContext';
import { useEffect, useState } from 'react';

export function ControlBar() {
  const { selectedTypes, years } = useUtilityProviderContext();
  const [showMenu, setShowMenu] = useState(false);

  const getTypeSelector = () => (
    <TypeSelector
      types={['Lämmitys', 'Vesi', 'Sähkö']}
      initialQuery={selectedTypes.join(';')}
    />
  );

  const getTimeframeSelector = () => (
    <TimeframeSelector>
      <option value='null'>Kaikki</option>
      {years.map(year => (
        <option value={year}>{year}</option>
      ))}
    </TimeframeSelector>
  );

  const menuClasses = [
    'xs:flex flex-col gap-2 md:hidden fixed top-0 right-0 w-[80%] shadow-lg bg-white border-l border-l-slate-200 h-full z-20',
    showMenu ? 'translate-x-0' : 'translate-x-[100%]',
  ];

  return (
    <>
      <div
        id='utility-menu'
        className={menuClasses.join(' ')}>
        <div
          id='utility-menu-header'
          className='flex items-center border-b border-slate-200 mb-2'>
          <IconButton
            id='utility-menu-close-btn'
            onClick={() => setShowMenu(false)}>
            <Clear sx={{ color: 'black' }} />
          </IconButton>

          <span>Suodata</span>
        </div>
        <div
          id='utility-menu-body'
          className='flex flex-col gap-4 px-2'>
          {getTimeframeSelector()}
          {getTypeSelector()}
        </div>
      </div>

      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-xl text-slate-500 mr-4'>Kulutustiedot</h1>
        <ScrollOnX>
          <div
            id='utility-options'
            className='flex-row xs:gap-1 md:gap-4 pr-1 xs:hidden md:flex'>
            {getTimeframeSelector()}
            {getTypeSelector()}
          </div>

          <div className='xs:block md:hidden'>
            <IconButton
              id='mobile-menu-trigger'
              onClick={() => setShowMenu(true)}>
              <MoreVert />
            </IconButton>
          </div>
        </ScrollOnX>

        <Link
          href='utility/add'
          className='text-nowrap'>
          <Button
            variant='contained'
            size='small'
            type='button'
            startIcon={<Add />}>
            Lisää Uusi
          </Button>
        </Link>
      </div>
    </>
  );
}
