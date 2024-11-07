'use client';

import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import colors from 'kotilogi-app/colors';
import { aggregate, aggregate_old, arraysToValues } from './aggregateData';
import { useUtilityProviderContext } from './UtilityContext';
import { BlankChart } from '@/components/New/BlankChart';
import { useEffect, useMemo, useState } from 'react';

export function UtilityPieChart() {
  const { data } = useUtilityProviderContext();
  const [chartWidth, setChartWidth] = useState<'100%' | '30%'>('30%');
  const aggregatedData = useMemo(() => arraysToValues(aggregate_old(data)), [data]);
  const total = useMemo(
    () => aggregatedData.reduce((acc, cur) => (acc += cur.monetaryValue), 0),
    [aggregatedData]
  );

  const containerClassName = useMemo(
    () => ['flex flex-col', `w-[${chartWidth}]`, 'h-[300px]'].join(' '),
    [chartWidth]
  );

  useEffect(() => {
    //Only works when the page is loaded.
    setChartWidth(() => (window.innerWidth <= 1280 ? '100%' : '30%'));
  }, [window.innerWidth]);

  return data.length > 0 ? (
    <ResponsiveContainer
      width={chartWidth}
      height={300}>
      <PieChart>
        <Pie
          animationDuration={200}
          data={aggregatedData}
          dataKey={'amount'}>
          {aggregatedData.map((d, i) => {
            return (
              <Cell
                key={`data-${d.typeLabel}-${i}`}
                fill={
                  d.typeLabel == 'Lämmitys'
                    ? colors.heat
                    : d.typeLabel == 'Vesi'
                    ? colors.water
                    : d.typeLabel == 'Sähkö'
                    ? colors.electric
                    : 'gray'
                }></Cell>
            );
          })}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  ) : (
    <BlankChart
      variant='pie'
      width={'40%'}
      height={300}
      dummyLen={12}
    />
  );
}
