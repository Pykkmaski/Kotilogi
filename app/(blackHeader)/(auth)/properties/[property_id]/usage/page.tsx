import db from 'kotilogi-app/dbconfig';
import { PageContent } from './page.components';

import { Header } from './_components/Header';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { UsageProvider } from './_components/UsageProvider';
import { UtilityType } from 'kotilogi-app/models/enums/UtilityType';
import { getUtilityData } from 'kotilogi-app/models/utilityData';

async function getUsageData(query: any, year?: number) {
  const table = 'utilityData';
  const { type, ...restOfQuery } = query;

  if (!year || year == UtilityType.ALL) {
    return db(table)
      .join('objectData', 'objectData.id', '=', 'utilityData.id')
      .join('ref_utilityTypeData', { 'ref_utilityTypeData.id': 'utilityData.type' })
      .whereILike('label', `%${type}%`)
      .andWhere(restOfQuery)
      .select(
        `${table}.*`,
        'objectData.*',
        'ref_utilityTypeData.unitSymbol',
        'ref_utilityTypeData.label'
      )
      .orderBy('time', 'desc');
  } else {
    return db(table)
      .join('objectData', 'objectData.id', '=', 'utilityData.id')
      .join('ref_utilityTypeData', { 'ref_utilityTypeData.id': `${table}.type` })
      .where(function () {
        //The timestamps are stored as integers. Filter by values that fall within the same year.
        const time = new Date(0);
        time.setFullYear(year);

        const endTime = new Date(time);
        endTime.setFullYear(endTime.getFullYear() + 1);

        this.where('time', '>=', time.getTime()).andWhere('time', '<', endTime.getTime());
      })
      .andWhereILike('label', `%${type}%`)
      .andWhere(restOfQuery)
      .select(
        `${table}.*`,
        'objectData.*',
        'ref_utilityTypeData.unitSymbol',
        'ref_utilityTypeData.label'
      )
      .orderBy('time', 'desc');
  }
}

export default async function UsagePage({ params, searchParams }) {
  const type = parseInt(searchParams.type) as number | undefined;
  const year = parseInt(searchParams.year) as number | undefined;

  //Get the data for the selected year, and the timestamps for all data, to render the year selector.
  const timestampStream = await db('utilityData')
    .join('objectData', 'objectData.id', '=', 'utilityData.id')
    .where({ parentId: params.property_id })
    .select('time')
    .orderBy('time', 'desc')
    .stream();

  const timestampsSet = new Set<number>([]);
  for await (const timestamp of timestampStream) {
    timestampsSet.add(new Date(parseInt(timestamp.time)).getFullYear());
  }
  const timestamps = Array.from(timestampsSet);

  //The query to use when fetching the usage data.
  var query =
    type == UtilityType.ALL
      ? {
          parentId: params.property_id,
        }
      : {
          parentId: params.property_id,
          type,
        };

  //Display data for the first year in the timestamps array by default.
  const displayYear =
    year || (timestamps.length ? new Date(timestamps[0]).getFullYear() : new Date().getFullYear());

  const data = await getUtilityData(query, year);

  console.log(data);
  if (!data) throw new Error('Kulutustietojen lataus epäonnistui! Kokeile päivittää sivu.');

  return (
    <main className='w-full flex flex-col gap-4'>
      <UsageProvider
        propertyId={params.property_id}
        timestamps={timestamps}
        displayYear={displayYear.toString()}
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
