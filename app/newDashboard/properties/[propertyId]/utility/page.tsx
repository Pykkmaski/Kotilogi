import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { Main } from '@/components/New/Main';
import { SpaceBetween } from '@/components/New/Spacers';
import { MainHeading } from '@/components/New/Typography/Headings';
import { DataRing } from '@/components/New/UtilityPageComps/DataRing';
import { Chart } from '@/components/UI/Chart';
import { Add, PlusOne } from '@mui/icons-material';
import { Button } from '@mui/material';
import { colors } from 'kotilogi-app/apex.config';
import db from 'kotilogi-app/dbconfig';
import { UtilityType } from 'kotilogi-app/models/enums/UtilityType';
import { getEnumAsDigits } from 'kotilogi-app/models/utils/getEnumAsDigits';
import { filterIntoObject } from 'kotilogi-app/utils/array';
import Link from 'next/link';

export default async function UtilityPage({ params }) {
  const propertyId = params.propertyId;
  const data_utilities = await db('data_utilities')
    .join('data_objects', { 'data_objects.id': 'data_utilities.id' })
    .where({ parentId: propertyId });

  const utilityObj = filterIntoObject(data_utilities, 'type', getEnumAsDigits(UtilityType));
  return (
    <Main>
      <div className='w-full p-4'>
        <SpaceBetween
          firstElement={
            <MainHeading>
              <span>Kulutustiedot</span>
            </MainHeading>
          }
          secondElement={
            <Link href='utility/add'>
              <Button
                variant='text'
                startIcon={<Add />}>
                Lisää Uusi Tieto
              </Button>
            </Link>
          }
        />
      </div>

      <div className='w-full flex gap-2'>
        <Chart
          options={{
            chart: {
              toolbar: { show: false },
              width: '100%',

              type: 'bar',
            },

            xaxis: {
              title: {
                text: 'Kuukausi',
              },
            },

            yaxis: {
              title: {
                text: 'Hinta',
              },
            },

            series: [
              {
                name: 'Series 1',
                data: [10, 20, 30],
                color: colors['heat'],
              },

              {
                name: 'Series 2',
                data: [5, 15, 27],
                color: colors['water'],
              },

              {
                name: 'Series 3',
                data: [16, 3, 13],
                color: colors['electric'],
              },
            ],
          }}
        />
      </div>
    </Main>
  );
}
