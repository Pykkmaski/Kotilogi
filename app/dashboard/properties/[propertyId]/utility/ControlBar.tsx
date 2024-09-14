'use client';

import { ScrollOnX } from '@/components/New/ScrollOnX';
import { TimeframeSelector } from './TimeframeSelector';
import { TypeSelector } from './TypeSelector';
import { Button, IconButton } from '@mui/material';
import { Add, Clear, MoreVert } from '@mui/icons-material';
import Link from 'next/link';
import { useUtilityProviderContext } from './UtilityContext';
import { SideMenu } from '@/components/New/SideMenu';

export function ControlBar() {
  const { selectedTypes, years } = useUtilityProviderContext();

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

  return (
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
          <SideMenu
            trigger={
              <IconButton id='mobile-menu-trigger'>
                <MoreVert />
              </IconButton>
            }
            title='Suodata'>
            {getTimeframeSelector()}
            {getTypeSelector()}
          </SideMenu>
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
  );
}
