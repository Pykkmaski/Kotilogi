import { Main } from '@/components/New/Main';
import { Heading } from '@/components/UI/Heading';
import { Add, Clear } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { getUtilityData, getUtilityYears } from 'kotilogi-app/dataAccess/utilities';
import { UtilityPieChart } from './UtilityPieChart';
import { UtilityProvider } from './UtilityContext';
import { UtilityLineChart } from './UtilityLineChart';
import { TimeframeSelector } from './TimeframeSelector';
import Link from 'next/link';
import { TypeSelector } from './TypeSelector';
import db from 'kotilogi-app/dbconfig';
import { DataTable } from './DataTable';
import { ScrollOnX } from '@/components/New/ScrollOnX';
import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';

export default async function UtilityPage({ params, searchParams }) {
  const { year, types } = searchParams;
  const propertyId = params.propertyId;
  const utilityData = await getUtilityData(
    propertyId,
    year && parseInt(year),
    (types && types.split(';')) || []
  );
  const allTypes = await db('ref_utilityTypes').pluck('name');
  const years = await getUtilityYears(propertyId);

  return (
    <UtilityProvider
      data={utilityData}
      allTypes={allTypes}
      year={(year != 'null' && year) || null}
      selectedTypes={(types && types.split(';')) || []}>
      <Main>
        <div
          id='utility-menu'
          className='xs:flex flex-col gap-2 md:hidden fixed top-0 right-0 w-[80%] shadow-lg bg-white border-l border-l-slate-200 h-full z-20'>
          <div
            id='utility-menu-header'
            className='flex items-center border-b border-slate-200 mb-2'>
            <IconButton>
              <Clear sx={{ color: 'black' }} />
            </IconButton>

            <span>Suodata</span>
          </div>
          <div
            id='utility-menu-body'
            className='flex flex-col gap-4 px-2'>
            <TimeframeSelector>
              <option value='null'>Kaikki</option>
              {years.map(year => (
                <option value={year}>{year}</option>
              ))}
            </TimeframeSelector>

            <TypeSelector
              types={['Lämmitys', 'Vesi', 'Sähkö']}
              initialQuery={types}
            />
          </div>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <h1 className='text-xl text-slate-500 mr-4'>Kulutustiedot</h1>
          <ScrollOnX>
            <div
              id='utility-options'
              className='flex-row xs:gap-1 md:gap-4 pr-1 xs:hidden md:flex'>
              <TimeframeSelector>
                <option value='null'>Kaikki</option>
                {years.map(year => (
                  <option value={year}>{year}</option>
                ))}
              </TimeframeSelector>
              <TypeSelector
                types={['Lämmitys', 'Vesi', 'Sähkö']}
                initialQuery={types}
              />
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
        <div className='flex flex-nowrap xs:flex-col xl:flex-row w-full gap-4 bg-white shadow-sm py-2 xs:items-center xl:items-none'>
          <UtilityPieChart />

          <UtilityLineChart />
        </div>
        <DataTable />
      </Main>
    </UtilityProvider>
  );
}
