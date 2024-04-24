import db from 'kotilogi-app/dbconfig';
import { PageContent } from './page.components';
import * as usage from '@/actions/usage';

import { Header } from './Header';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { UsageProvider } from './UsageProvider';
import { Knex } from 'knex';

function getUsageData(query: any, year: string) {
  if (year === 'all') {
    return db('usage').where(query).orderBy('time', 'desc');
  } else {
    return db('usage')
      .where(function () {
        this.whereLike('time', `%${year}%`);
      })
      .andWhere(query)
      .orderBy('time', 'desc');
  }
}

export default async function UsagePage({ params, searchParams }) {
  const type = searchParams.type as Kotidok.UsageTypeType | 'all';
  var year = searchParams.year as string | undefined;

  if (!year) {
    //Fetch all usage data for this property, and assign the year as the most recent year with usage-data.
    const dates = await db('usage')
      .where({ refId: params.property_id })
      .select('time')
      .orderBy('time', 'desc');
    if (dates.length) {
      year = new Date(dates.at(0).time).getFullYear().toString();
    } else {
      //No usage data added yet. Arbitrarily set the year to the current year.
      year = new Date().getFullYear().toString();
    }
  }

  //The query to use when fetching the usage data.
  var query =
    type === 'all'
      ? {
          refId: params.property_id,
        }
      : {
          refId: params.property_id,
          type,
        };

  //Get the data for the selected year, and the timestamps for all data, to render the year selector.
  const dataPromise = getUsageData(query, year);
  const timestampsPromise = db('usage').select('time');
  const [data, timestamps] = await Promise.all([dataPromise, timestampsPromise]);

  if (!data || !timestamps) throw new Error('Kulutustietojen lataus epäonnistui!');

  var displayYear = 'all';
  if (data.length) {
    displayYear = new Date(data.at(-1).time).getFullYear().toString();
  }

  return (
    <main className='w-full flex flex-col gap-4'>
      <UsageProvider
        propertyId={params.property_id}
        timestamps={timestamps}
        displayYear={displayYear}
        type={type}
        data={data}>
        <SelectablesProvider>
          <Header />
          <PageContent />
        </SelectablesProvider>
      </UsageProvider>
    </main>
  );
}
