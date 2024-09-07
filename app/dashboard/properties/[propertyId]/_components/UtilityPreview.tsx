'use client';

import { PreviewContentBase } from '@/components/New/Boxes/PreviewContent';
import { Bolt } from '@mui/icons-material';
import { UtilityDataType } from 'kotilogi-app/dataAccess/types';
import { useUtilityProviderContext } from '../utility/UtilityContext';
import { UtilityLineChart } from '../utility/UtilityLineChart';

export function UtilityPreview({ propertyId }: { propertyId: string }) {
  const { data: utilityData } = useUtilityProviderContext();

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
      addNewUrl={`/dashboard/properties/${propertyId}/utility/add`}
      showAllUrl={`${propertyId}/utility`}>
      {!utilityData.length ? (
        <span className='text-slate-500'>Ei Kulutustietoja.</span>
      ) : (
        <div className='flex w-full justify-start gap-4 items-center'>
          <UtilityLineChart />
        </div>
      )}
    </PreviewContentBase>
  );
}
