'use client';

import { Cell, Pie, PieChart } from 'recharts';

export function BlankChart({ width, height }) {
  const genDummyData = () => {
    const randDummy = () => ({ dummy: Math.round(Math.random() * 100) });
    const arr = [];
    for (let i = 0; i < 3; ++i) {
      arr.push(randDummy());
    }
    return arr;
  };
  const dummyData = genDummyData();

  return (
    <div className='relative flex items-center justify-center w-full h-full'>
      <h1 className='text-lg z-20 absolute font-semibold text-white p-2 backdrop-blur-sm'>
        Ei tietoja.
      </h1>
      <PieChart
        width={width}
        height={height}>
        <Pie
          animationDuration={200}
          data={dummyData}
          dataKey='dummy'>
          {dummyData.map((d, i) => {
            return <Cell key={`no-data-cell-${i}`} />;
          })}
        </Pie>
      </PieChart>
    </div>
  );
}
