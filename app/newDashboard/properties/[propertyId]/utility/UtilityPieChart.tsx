'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import colors from 'kotilogi-app/colors';
import { aggregate, arraysToValues } from './aggregateData';
import { useUtilityProviderContext } from './UtilityContext';

export function UtilityPieChart() {
  const { data } = useUtilityProviderContext();
  const aggregatedData = arraysToValues(aggregate(data));

  return (
    <ResponsiveContainer
      width='40%'
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
                }
              />
            );
          })}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
