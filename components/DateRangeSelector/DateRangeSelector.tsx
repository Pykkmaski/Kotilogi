'use client';

import { useQuery } from 'kotilogi-app/hooks/useQuery';
import { useEffect } from 'react';

type DateRangeSelectorProps = {
  timestamps: number[];
  currentYear: string;
};

export function DateRangeSelector({ timestamps, currentYear }: DateRangeSelectorProps) {
  const { updateQuery, updateQueryDirectly } = useQuery('year', currentYear.toString());

  const getOptions = () => {
    const opts: JSX.Element[] = [];
    for (const stamp of timestamps) {
      const selected = stamp === parseInt(currentYear);
      console.log(stamp, currentYear);
      opts.push(
        <option
          value={stamp}
          selected={selected}>
          {stamp}
        </option>
      );
    }

    return opts;
  };

  useEffect(() => {
    updateQueryDirectly(currentYear);
  }, [currentYear]);

  return (
    <select
      name='year'
      onChange={e => updateQuery(e)}
      className='w-[100px]'
      defaultValue={parseInt(currentYear)}>
      {getOptions()}
    </select>
  );
}
