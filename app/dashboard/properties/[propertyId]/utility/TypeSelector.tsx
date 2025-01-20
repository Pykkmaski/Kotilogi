'use client';

import { useQuery } from '@/hooks/useQuery';
import { Bolt, LocalFireDepartment, WaterDrop } from '@mui/icons-material';

type TypeSelectorProps = {
  types: string[];
  initialQuery: string;
};

export function TypeSelector({ types = [], initialQuery }: TypeSelectorProps) {
  const { currentQuery, updateQuery, updateQueryDirectly } = useQuery('types', initialQuery, 50);

  return (
    <div className='md:ml-8 xs:ml-0 flex flex-row gap-4 items-center'>
      {types.map((type, i) => (
        <div
          className='flex flex-row items-center gap-1'
          key={`utility-type-selector-${i}`}>
          <label
            className={
              type == 'Lämmitys'
                ? 'text-heat'
                : type == 'Vesi'
                ? 'text-water'
                : type == 'Sähkö'
                ? 'text-electric'
                : 'text-black'
            }>
            {type == 'Lämmitys' ? (
              <LocalFireDepartment />
            ) : type == 'Vesi' ? (
              <WaterDrop />
            ) : type == 'Sähkö' ? (
              <Bolt />
            ) : null}
          </label>
          <input
            title={type}
            type='checkbox'
            value={type}
            defaultChecked={currentQuery && currentQuery.includes(type)}
            onChange={e => {
              const checked = e.target.checked;
              const previousQuery = currentQuery && currentQuery.split(';');

              const querySet = new Set<string>();
              if (previousQuery) {
                previousQuery.map(q => querySet.add(q));
              }

              if (checked) {
                querySet.add(e.target.value);
              } else {
                querySet.delete(e.target.value);
              }

              updateQueryDirectly(Array.from(querySet).join(';'));
            }}
          />
        </div>
      ))}
    </div>
  );
}
