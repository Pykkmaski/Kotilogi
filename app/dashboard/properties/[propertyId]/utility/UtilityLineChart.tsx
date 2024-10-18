'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useUtilityProviderContext } from './UtilityContext';
import { aggregateToMonths, aggregateToYears } from './aggregateData';
import colors from 'kotilogi-app/colors';
import { BlankChart } from '@/components/New/BlankChart';

export function UtilityLineChart() {
  const { data, selectedTypes, allTypes, year } = useUtilityProviderContext();

  const aggregatedData =
    year !== null
      ? aggregateToMonths(data)
      : aggregateToYears(data).reduce((acc, cur) => {
          const data = [...acc, ...cur.data];
          return data;
        }, []);

  const getBar = (typeLabel: string, key: string) => (
    <Bar
      key={key}
      dataKey={typeLabel}
      type='monotone'
      fill={
        typeLabel == 'Lämmitys'
          ? colors.heat
          : typeLabel == 'Vesi'
          ? colors.water
          : typeLabel == 'Sähkö'
          ? colors.electric
          : 'gray'
      }
      animationDuration={200}
    />
  );

  return (
    <ResponsiveContainer
      width='100%'
      height={300}>
      {data.length > 0 ? (
        <BarChart data={aggregatedData}>
          <CartesianGrid strokeDasharray={'3 3'} />
          <Tooltip
            labelFormatter={label => {
              const date = new Date();
              date.setMonth(label);
              return date.toLocaleDateString('fi', { month: 'long' });
            }}
          />

          <XAxis
            dataKey='month'
            tickFormatter={entry => {
              const date = new Date();
              date.setMonth(entry);
              return date.toLocaleDateString('fi', { month: 'long' });
            }}
          />
          {(selectedTypes.length &&
            selectedTypes.map((type, i) => getBar(type, `bar-${type}-${i}`))) ||
            allTypes.map((val, i) => getBar(val, `bar-${val}-${i}`))}
        </BarChart>
      ) : (
        <BlankChart
          variant='bar'
          dummyLen={12}
          width={'100%'}
          height={300}
        />
      )}
    </ResponsiveContainer>
  );
}
