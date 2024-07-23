import { PreviewContentBase } from '@/components/New/Boxes/PreviewContent';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import { DataRing } from '@/components/New/UtilityPageComps/DataRing';
import { Bolt } from '@mui/icons-material';
import { UtilityDataType } from 'kotilogi-app/models/types';
import Link from 'next/link';

export function UtilityPreview({
  propertyId,
  utilityData,
}: {
  propertyId: string;
  utilityData: UtilityDataType[];
}) {
  return (
    <PreviewContentBase
      icon={<Bolt />}
      preview
      previewDescription={
        <>
          Kulutustietoja ovat kaikki vesi- lämmitys-, sähkö, sekä muut kulut, joita taloudessa voi
          olla.
        </>
      }
      headingText='Kulutustiedot'
      addNewUrl={`/newDashboard/properties/${propertyId}/utility/add`}
      showAllUrl={`/newDashboard/properties/${propertyId}/utility`}>
      {!utilityData.length ? (
        <span className='text-slate-500'>Ei Kulutustietoja.</span>
      ) : (
        <div className='flex w-full justify-start gap-4'>
          <DataRing
            data={utilityData}
            label='Kaikki'
          />

          <Paragraph>
            Tässä näet talon koko kulutuksen.
            <br /> Tarkemmat tiedot näet klikkaamalla{' '}
            <Link
              className='text-teal-500'
              href={`/newDashboard/properties/${propertyId}/utility`}>
              Näytä Lisää.
            </Link>
          </Paragraph>
        </div>
      )}
    </PreviewContentBase>
  );
}
