'use client';

import { ContentCard } from '@/components/UI/RoundedBox';
import { UsageColumnChart } from '@/components/UI/Chart';
import { colors } from 'kotilogi-app/apex.config';
import { UsageDataCategorized } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/usage/_components/UsageDataCategorized';
import { TotalPrice } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/usage/_components/TotalPrice';
import { AllUsageDataChart } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/usage/_components/AllUsageDataChart';
import { DataList } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/usage/_components/DataList';
import { useUsageProviderContext } from './_components/UsageProvider';
import { DataRing } from './_components/DataRing';
import { UtilityType } from 'kotilogi-app/models/enums/UtilityType';

export function PageContent() {
  const { data, displayYear, type } = useUsageProviderContext();

  const getChart = () => {
    if (type === UtilityType.ALL) {
      return <AllUsageDataChart data={data} />;
    } else {
      return (
        <UsageColumnChart
          data={data}
          columnColor={colors[type]}
          options={{
            chart: {
              width: '100%',
            },
            title: {
              text: 'Kulutus',
            },
          }}
        />
      );
    }
  };

  return (
    <div className='flex xs:flex-col lg:flex-row gap-2 w-full max-h-full'>
      <div className='flex-[1]'>
        <ContentCard title='Yhteenveto'>
          <div className='flex flex-col gap-2'>
            <div className='xs:hidden lg:block'>{getChart()}</div>

            <div className='flex-1 lg:flex xs:flex-col lg:flex-row justify-center items-center'>
              <div className='xs:mb-8 lg:m-0'>
                <TotalPrice data={data} />
              </div>

              <DataRing data={data} />
              {type === UtilityType.ALL ? <UsageDataCategorized data={data} /> : null}
            </div>
          </div>
        </ContentCard>
      </div>

      <div className='flex-1 overflow-y-scroll max-h-[100%]'>
        <ContentCard title='Tiedot'>
          <DataList data={data} />
        </ContentCard>
      </div>
    </div>
  );
}
