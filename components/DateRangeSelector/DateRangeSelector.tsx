'use client';

import { useQuery } from 'kotilogi-app/hooks/useQuery';

type DateRangeSelectorProps = {
  timestamps: { time: string }[];
  currentYear: string;
};

export function DateRangeSelector({ timestamps, currentYear }: DateRangeSelectorProps) {
  const { updateQuery, currentQuery } = useQuery('year', currentYear.toString());

  const yearsSet = new Set<number>();
  for (const stamp of timestamps) {
    const year = new Date(stamp.time).getFullYear();
    yearsSet.add(year);
  }

  const years = Array.from(yearsSet).sort((a, b) => a - b);

  const getOptions = () => {
    const opts: JSX.Element[] = [];

    for (let i = years.length - 1; i >= 0; --i) {
      const selected = years[i] === parseInt(currentYear);
      opts.push(
        <option
          value={years[i]}
          selected={selected}>
          {years[i]}
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
