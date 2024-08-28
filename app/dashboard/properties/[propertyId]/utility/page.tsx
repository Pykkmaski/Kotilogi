import { Main } from '@/components/New/Main';
import { Heading } from '@/components/UI/Heading';
import { Add, Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { getUtilityData, getUtilityYears } from 'kotilogi-app/models/utilityData';
import { UtilityPieChart } from './UtilityPieChart';
import { UtilityProvider } from './UtilityContext';
import { UtilityLineChart } from './UtilityLineChart';
import { TimeframeSelector } from './TimeframeSelector';
import Link from 'next/link';
import { TypeSelector } from './TypeSelector';
import db from 'kotilogi-app/dbconfig';
import { DataTable } from './DataTable';
import { ScrollOnX } from '@/components/New/ScrollOnX';
import { DialogControl } from '@/components/Util/DialogControl';
import { DataSubmitDialog } from '@/components/New/DataSubmitDialog';
import axios from 'axios';
import { UtilityBatchForm } from './add/_components/UtilityBatchForm';
import { UtilitySubmitDialog } from './UtilitySubmitDialog';

export default async function UtilityPage({ params, searchParams }) {
  const { year, types } = searchParams;
  const propertyId = params.propertyId;
  const utilityData = await getUtilityData(
    { parentId: propertyId },
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
        <div className='flex flex-row justify-between'>
          <ScrollOnX>
            <div className='flex flex-row xs:gap-1 md:gap-4 pr-1'>
              <Heading>Kulutustiedot</Heading>
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
              type='button'
              startIcon={<Add />}>
              Lisää Uusi
            </Button>
          </Link>
        </div>
        <div className='flex flex-nowrap w-full gap-4 bg-white shadow-sm py-2'>
          <UtilityPieChart />

          <UtilityLineChart />
        </div>
        <DataTable />
      </Main>
    </UtilityProvider>
  );
}
