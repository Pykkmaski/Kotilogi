'use client';

import { ContentCard } from 'kotilogi-app/components/RoundedBox/RoundedBox';
import { UsageColumnChart } from 'kotilogi-app/components/Experimental/Chart/Chart';
import { UsagePieChart } from '@/components/UsagePage/PieChart';
import { colors } from 'kotilogi-app/apex.config';
import { UsageDataCategorized } from '@/components/UsagePage/UsageDataCategorized';
import { TotalPrice } from '@/components/UsagePage/TotalPrice';
import { AllUsageDataChart } from '@/components/UsagePage/AllUsageDataChart';
import { DataList } from '@/components/UsagePage/DataList';
import { useUsageProviderContext } from './UsageProvider';

function DataRing({ data, year }) {
  return (
    <div className='flex justify-center items-center relative'>
      <UsagePieChart data={data} />
      <div className='absolute text-2xl text-slate-500'>{year}</div>
    </div>
  );
}

export function PageContent() {
  const { data, displayYear, type } = useUsageProviderContext();

  const getChart = () => {
    if (type === 'all') {
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

              <DataRing
                data={data}
                year={displayYear}
              />
              {type === 'all' ? <UsageDataCategorized data={data} /> : null}
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
