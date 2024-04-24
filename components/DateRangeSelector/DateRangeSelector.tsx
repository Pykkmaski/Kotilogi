'use client';

import { useQuery } from 'kotilogi-app/hooks/useQuery';

type DateRangeSelectorProps = {
  timestamps: number[];
  currentYear: string;
};

export function DateRangeSelector({ timestamps, currentYear }: DateRangeSelectorProps) {
  const { updateQuery, currentQuery } = useQuery('year', currentYear.toString());

  const getOptions = () => {
    const opts: JSX.Element[] = [];

    for (const stamp of timestamps) {
      console.log(currentYear);
      const selected = stamp === parseInt(currentYear);
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

  return (
    <select
      name='year'
      onChange={e => updateQuery(e)}
      className='w-[100px]'
      defaultValue={parseInt(currentQuery)}>
      {getOptions()}
    </select>
  );
}
