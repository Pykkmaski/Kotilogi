'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import colors from 'kotilogi-app/colors';
import { aggregate, arraysToValues } from './aggregateData';
import { useUtilityProviderContext } from './UtilityContext';
import { BlankChart } from '@/components/New/BlankChart';

export function UtilityPieChart() {
  const { data } = useUtilityProviderContext();
  const aggregatedData = arraysToValues(aggregate(data));

  return (
    <ResponsiveContainer
      width='40%'
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
                  }
                />
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
