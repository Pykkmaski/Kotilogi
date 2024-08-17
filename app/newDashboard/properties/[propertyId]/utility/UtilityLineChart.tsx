'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useUtilityProviderContext } from './UtilityContext';
import { aggregate, aggregateToMonths, arraysToValues, getByTypeLabel } from './aggregateData';
import colors from 'kotilogi-app/colors';
import { timestampToISOString } from 'kotilogi-app/utils/timestampToISOString';
import { getLongest } from 'kotilogi-app/utils/array';

export function UtilityLineChart() {
  const { data, selectedTypes, allTypes } = useUtilityProviderContext();
  const aggregatedData = aggregateToMonths(data);

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
