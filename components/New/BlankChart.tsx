'use client';

import {
  Area,
  AreaChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
} from 'recharts';
import { RenderOnCondition } from '../Util/RenderOnCondition';
import { useMemo } from 'react';

type BlankChartProps = {
  width: number | string;
  height: number | string;
  variant?: 'bar' | 'pie';
  dummyLen?: number;
};

export function BlankChart({
  width = 100,
  height = 100,
  variant = 'bar',
  dummyLen = 3,
}: BlankChartProps) {
  const dummyData = useMemo(() => {
    const randDummy = () => ({ dummy: Math.round(Math.random() * 100) });
    const arr = [];
    for (let i = 0; i < dummyLen; ++i) {
      arr.push(randDummy());
    }
    return arr;
  }, [dummyLen]);

  const titleClasses = [
    'text-lg z-20 absolute font-semibold p-2 text-white bg-black rounded-md shadow-md',
  ];

  return (
    <div className='relative flex items-center justify-center w-full h-full'>
      <RenderOnCondition condition={variant == 'bar'}>
        <h1 className={titleClasses.join(' ')}>Ei tietoja.</h1>
      </RenderOnCondition>

      <ResponsiveContainer
        width={width}
        height={height}>
        {variant === 'pie' ? (
          <PieChart>
            <Pie
              animationDuration={200}
              data={dummyData}
              dataKey='dummy'>
              {dummyData.map((d, i) => {
                return <Cell key={`no-data-cell-${i}`} />;
              })}
            </Pie>
          </PieChart>
        ) : (
          <AreaChart data={dummyData}>
            <Area
              dataKey={'dummy'}
              fill={'gray'}
              stroke='none'
              type='monotone'
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
