import { MutableRefObject } from 'react';
import ReactApexChart from 'react-apexcharts';
import { mergeByMonth } from 'kotilogi-app/actions/usage.utils';
import { UtilityDataType } from 'kotilogi-app/models/types';
import { ContentCard, RoundedBox } from '@/components/UI/RoundedBox';
import { UsageColumnChart } from '@/components/UI/Chart';

type ChartBoxProps = {
  title: string;
  data: UtilityDataType[];
  columnColor: string;
  ref?: MutableRefObject<HTMLDivElement | null>;
};

export function ChartBox(props: ChartBoxProps) {
  const mergedData = mergeByMonth(props.data);

  return (
    <div
      className='flex w-full gap-2'
      ref={props.ref}>
      <div className='flex-1'>
        <ContentCard title={props.title}>
          <UsageColumnChart
            options={{
              noData: {
                text: 'Ei tietoja valitulle ajalle.',
              },
            }}
            data={props.data}
            columnColor={props.columnColor}
          />
        </ContentCard>
      </div>

      <div className='flex-1 h-full'>
        <RoundedBox>
          <div className='flex flex-col gap-2'>
            {props.data.map((item, index) => {
              return <span key={`water-data-${index}`}>{item.monetaryAmount}</span>;
            })}
          </div>
        </RoundedBox>
      </div>
    </div>
  );
}
