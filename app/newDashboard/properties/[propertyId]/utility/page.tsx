import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { Main } from '@/components/New/Main';
import { SpaceBetween } from '@/components/New/Spacers';
import { MainHeading } from '@/components/New/Typography/Headings';
import { DataRing } from '@/components/New/UtilityPageComps/DataRing';
import { Add, PlusOne } from '@mui/icons-material';
import { Button } from '@mui/material';
import db from 'kotilogi-app/dbconfig';
import { UtilityType } from 'kotilogi-app/models/enums/UtilityType';
import { getEnumAsDigits } from 'kotilogi-app/models/utils/getEnumAsDigits';
import { filterIntoObject } from 'kotilogi-app/utils/array';
import Link from 'next/link';

export default async function UtilityPage({ params }) {
  const propertyId = params.propertyId;
  const utilityData = await db('utilityData')
    .join('objectData', { 'objectData.id': 'utilityData.id' })
    .where({ parentId: propertyId });

  const utilityObj = filterIntoObject(utilityData, 'type', getEnumAsDigits(UtilityType));
  return (
    <Main>
      <div className='w-full p-4 bg-gray-800'>
        <SpaceBetween
          firstElement={
            <MainHeading>
              <span className='text-white'>Kulutustiedot</span>
            </MainHeading>
          }
          secondElement={
            <Link href='utility/add'>
              <Button
                sx={{ color: 'white' }}
                variant='text'
                startIcon={<Add />}>
                Lisää Uusi Tieto
              </Button>
            </Link>
          }
        />
        <div className='flex w-full gap-4'>
          <DataRing data={utilityData} />
          <div className='flex flex-col gap-4 text-white'>
            <span>
              LÄMMITYS:{' '}
              {utilityObj[UtilityType.HEAT].reduce((acc, cur) => (acc += cur.monetaryAmount), 0) /
                100}
              €
            </span>
          </div>
        </div>
      </div>
    </Main>
  );
}
