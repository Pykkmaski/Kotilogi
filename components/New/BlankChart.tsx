'use client';

import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis } from 'recharts';

type BlankChartProps = {
  width: number | string;
  height: number | string;
  variant?: 'bar' | 'pie';
  dummyLen?: number;
};

export function BlankChart({ width, height, variant = 'bar', dummyLen = 3 }: BlankChartProps) {
  const genDummyData = () => {
    const randDummy = () => ({ dummy: Math.round(Math.random() * 100) });
    const arr = [];
    for (let i = 0; i < dummyLen; ++i) {
      arr.push(randDummy());
    }
    return arr;
  };
  const dummyData = genDummyData();

  const titleClasses = ['text-lg z-20 absolute font-semibold p-2 text-white bg-black'];
  return (
    <div className='relative flex items-center justify-center w-full h-full'>
      {variant == 'bar' && <h1 className={titleClasses.join(' ')}>Ei tietoja.</h1>}
      <ResponsiveContainer
        width={width}
        height={height}>
        {variant == 'pie' ? (
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
          <BarChart data={dummyData}>
            <Bar
              dataKey={'dummy'}
              fill={'gray'}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
