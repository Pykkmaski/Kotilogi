import { Main } from '@/components/New/Main';

import { UtilityProvider } from '../../../../../features/utilities/contexts/UtilityContext';

import db from 'kotilogi-app/dbconfig';
import { utilities } from 'kotilogi-app/features/utilities/DAL/utilities';
import { ControlBar } from 'kotilogi-app/features/utilities/components/ControlBar';
import { UtilityPieChart } from 'kotilogi-app/features/utilities/components/UtilityPieChart';
import { UtilityLineChart } from 'kotilogi-app/features/utilities/components/UtilityLineChart';
import { DataTable } from 'kotilogi-app/features/utilities/components/DataTable';

export default async function UtilityPage({ params, searchParams }) {
  const { year, types } = await searchParams;
  const { propertyId } = await params;
  const utilityData = await utilities.get(
    propertyId,
    year && parseInt(year),
    (types && types.split(';')) || []
  );
  const allTypes = await db('ref_utilityTypes').pluck('name');
  const years = await utilities.getYears(propertyId);

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
