import { Main } from '@/components/New/Main';
import { getUtilityData, getUtilityYears } from 'kotilogi-app/dataAccess/utilities';
import { UtilityPieChart } from './UtilityPieChart';
import { UtilityProvider } from './UtilityContext';
import { UtilityLineChart } from './UtilityLineChart';
import db from 'kotilogi-app/dbconfig';
import { DataTable } from './DataTable';
import { ControlBar } from './ControlBar';

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
      years={years}
      selectedTypes={(types && types.split(';')) || []}>
      <Main>
        <ControlBar />
        <div className='flex flex-nowrap xs:flex-col xl:flex-row w-full gap-4 bg-white shadow-sm py-2 xs:items-center xl:items-none'>
          <UtilityPieChart />

          <UtilityLineChart />
        </div>
        <DataTable />
      </Main>
    </UtilityProvider>
  );
}
