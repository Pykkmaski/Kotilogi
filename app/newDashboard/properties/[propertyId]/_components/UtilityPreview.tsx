'use client';

import { PreviewContentBase } from '@/components/New/Boxes/PreviewContent';
import { ChipData } from '@/components/New/ChipData';
import { LabelGrid } from '@/components/New/LabelGrid';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import { DataRing } from '@/components/New/UtilityPageComps/DataRing';
import { Chart, UsageColumnChart } from '@/components/UI/Chart';
import { Bolt } from '@mui/icons-material';
import { blue, red, yellow } from '@mui/material/colors';
import { colors } from 'kotilogi-app/apex.config';
import { UtilityType } from 'kotilogi-app/models/enums/UtilityType';
import { UtilityDataType } from 'kotilogi-app/models/types';
import { filterIntoObject } from 'kotilogi-app/utils/array';
import Link from 'next/link';
import { Line, LineChart, Pie, PieChart, ResponsiveContainer } from 'recharts';

export function UtilityPreview({
  propertyId,
  utilityData,
}: {
  propertyId: string;
  utilityData: UtilityDataType[];
}) {
  const timestamps = utilityData.map(data => parseInt(data.time));
  const dataToDisplay: {
    heatAmount: number;
    waterAmount: number;
    electricAmount: number;
    timestamp: number;
  }[] = [];
  for (const timestamp of timestamps) {
    const date = new Date(timestamp);
  }
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
          <ResponsiveContainer
            width={'100%'}
            height={200}>
            <LineChart data={utilityData}>
              <Line dataKey='heat' />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </PreviewContentBase>
  );
}
