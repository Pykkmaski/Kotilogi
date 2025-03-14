'use client';

import { ScrollOnX } from '@/components/New/ScrollOnX';
import { TimeframeSelector } from './TimeframeSelector';
import { TypeSelector } from './TypeSelector';
import { Button, IconButton } from '@mui/material';
import { Add, MoreVert } from '@mui/icons-material';
import Link from 'next/link';

import { VPSideMenu } from '@/components/UI/VPSideMenu';
import colors from 'kotilogi-app/colors';
import { ToggleProvider } from '@/components/Util/ToggleProvider';
import { useUtilityProviderContext } from '../contexts/UtilityContext';

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
      {years.map((year, i) => (
        <option
          key={`timeframe-selector-option-${i}`}
          value={year}>
          {year}
        </option>
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
      </ScrollOnX>

      <div className='flex items-center'>
        <div className='xs:block md:hidden'>
          <ToggleProvider>
            <ToggleProvider.Trigger>
              <IconButton id='mobile-menu-trigger'>
                <MoreVert />
              </IconButton>
            </ToggleProvider.Trigger>

            <ToggleProvider.MUITarget>
              <VPSideMenu title='Suodata'>
                {getTimeframeSelector()}
                {getTypeSelector()}
              </VPSideMenu>
            </ToggleProvider.MUITarget>
          </ToggleProvider>
        </div>
        <Link
          href='utility/add'
          className='text-nowrap'>
          <div className='xs:hidden md:block'>
            <Button
              variant='contained'
              size='small'
              type='button'
              color='secondary'
              startIcon={<Add />}>
              Lisää Uusi
            </Button>
          </div>

          <div className='xs:block md:hidden'>
            <IconButton color='secondary'>
              <Add sx={{ color: colors.secondary }} />
            </IconButton>
          </div>
        </Link>
      </div>
    </div>
  );
}
