'use client';

import { RadioButton } from '@/components/Feature/RadioGroup';
import { useQuery } from '@/hooks/useQuery';

type TypeSelectorProps = {
  types: string[];
  initialQuery: string;
};

export function TypeSelector({ types = [], initialQuery }: TypeSelectorProps) {
  const { currentQuery, updateQuery, updateQueryDirectly } = useQuery('types', initialQuery, 50);

  return (
    <div className='ml-8 flex flex-row gap-4 items-center'>
      {types.map(type => (
        <div className='flex flex-row items-center gap-2'>
          <label>{type}</label>
          <input
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
