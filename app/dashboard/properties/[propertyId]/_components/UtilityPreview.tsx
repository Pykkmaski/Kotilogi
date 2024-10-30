'use client';

import { PreviewContentBase } from '@/components/New/Boxes/PreviewContent';
import { Bolt } from '@mui/icons-material';
import { useUtilityProviderContext } from '../utility/UtilityContext';
import { UtilityLineChart } from '../utility/UtilityLineChart';
import { Spacer } from '@/components/UI/Spacer';

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
        <Spacer
          width='full'
          justifyItems='start'
          gap={'medium'}
          alignItems='center'>
          <UtilityLineChart />
        </Spacer>
      )}
    </PreviewContentBase>
  );
}
