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

  useEffect(() => {
    //Only works when the page is loaded.
    setChartWidth(() => (window.innerWidth <= 1280 ? '100%' : '30%'));
  }, [window.innerWidth]);

  return (
    <ResponsiveContainer
      width={chartWidth}
      height={300}>
      {data.length > 0 ? (
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
                  }>
                  <Label
                    value='Kalja'
                    position={'center'}
                  />
                </Cell>
              );
            })}
          </Pie>
        </PieChart>
      ) : (
        <BlankChart
          variant='pie'
          width={'40%'}
          height={300}
        />
      )}
    </ResponsiveContainer>
  );
}
