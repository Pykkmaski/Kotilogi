import { colors } from 'kotilogi-app/apex.config';
import { ContentCard, RoundedBox } from '../../../../../../../components/UI/RoundedBox';
import { ColumnChart, UsageColumnChart } from '../../../../../../../components/UI/Chart';
import { MutableRefObject } from 'react';
import ReactApexChart from 'react-apexcharts';
import { mergeByMonth } from 'kotilogi-app/actions/usage.utils';

type ChartBoxProps = {
  title: string;
  data: Kotidok.UsageType[];
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
              return <span key={`water-data-${index}`}>{item.price}</span>;
            })}
          </div>
        </RoundedBox>
      </div>
    </div>
  );
}
