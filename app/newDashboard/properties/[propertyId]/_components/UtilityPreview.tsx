import { PreviewContentBase } from '@/components/New/Boxes/PreviewContent';
import { ChipData } from '@/components/New/ChipData';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import { DataRing } from '@/components/New/UtilityPageComps/DataRing';
import { UsageColumnChart } from '@/components/UI/Chart';
import { Bolt } from '@mui/icons-material';
import { blue, red, yellow } from '@mui/material/colors';
import { UtilityType } from 'kotilogi-app/models/enums/UtilityType';
import { UtilityDataType } from 'kotilogi-app/models/types';
import { filterIntoObject } from 'kotilogi-app/utils/array';
import Link from 'next/link';
import Chart from 'react-apexcharts';

export function UtilityPreview({
  propertyId,
  utilityData,
}: {
  propertyId: string;
  utilityData: UtilityDataType[];
}) {
  const utilityObject = filterIntoObject(utilityData, 'type', [
    UtilityType.HEAT,
    UtilityType.ELECTRIC,
    UtilityType.WATER,
  ]);

  return (
    <PreviewContentBase
      icon={<Bolt />}
      previewDescription={
        <>
          Kulutustietoja ovat kaikki vesi- lämmitys-, sähkö, sekä muut kulut, joita taloudessa voi
          olla.
        </>
      }
      headingText='Kulutustiedot'
      addNewUrl={`/newDashboard/properties/${propertyId}/utility/add`}>
      {!utilityData.length ? (
        <span className='text-slate-500'>Ei Kulutustietoja.</span>
      ) : (
        <div className='flex w-full justify-start gap-4 items-center'>
          <DataRing
            data={utilityData}
            label='Kaikki'
          />
          <div className='flex flex-col gap-4'>
            <ChipData
              sx={{ backgroundColor: red[600] }}
              label='Lämmitys'
              value={
                utilityObject[UtilityType.HEAT].reduce(
                  (acc, cur) => (acc += cur.monetaryAmount),
                  0
                ) / 100
              }
            />

            <ChipData
              sx={{ backgroundColor: blue[600] }}
              label='Vesi'
              value={
                utilityObject[UtilityType.WATER].reduce(
                  (acc, cur) => (acc += cur.monetaryAmount),
                  0
                ) / 100
              }
            />

            <ChipData
              sx={{ backgroundColor: yellow[800] }}
              label='Sähkö'
              value={
                utilityObject[UtilityType.ELECTRIC].reduce(
                  (acc, cur) => (acc += cur.monetaryAmount),
                  0
                ) / 100
              }
            />
          </div>
        </div>
      )}
    </PreviewContentBase>
  );
}
