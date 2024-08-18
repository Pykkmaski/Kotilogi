'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useUtilityProviderContext } from './UtilityContext';
import { aggregateToMonths, aggregateToYears } from './aggregateData';
import colors from 'kotilogi-app/colors';

export function UtilityLineChart() {
  const { data, selectedTypes, allTypes, year } = useUtilityProviderContext();
  console.log(year);
  const aggregatedData =
    year !== null
      ? aggregateToMonths(data)
      : aggregateToYears(data).reduce((acc, cur) => {
          const data = [...acc, ...cur.data];
          return data;
        }, []);

  console.log(aggregatedData);

  const getBar = (typeLabel: string) => (
    <Bar
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
      <BarChart data={aggregatedData}>
        <CartesianGrid strokeDasharray={'3 3'} />
        <Tooltip
          labelFormatter={label => {
            const date = new Date();
            date.setMonth(label);
            return date.toLocaleDateString('fi', { month: 'long' });
          }}
        />
        <YAxis />
        <XAxis
          dataKey='month'
          tickFormatter={entry => {
            const date = new Date();
            date.setMonth(entry);
            return date.toLocaleDateString('fi', { month: 'long' });
          }}
        />
        {(selectedTypes.length && selectedTypes.map(type => getBar(type))) ||
          allTypes.map(val => getBar(val))}
      </BarChart>
    </ResponsiveContainer>
  );
}
