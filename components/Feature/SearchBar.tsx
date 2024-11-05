'use client';

import { useQuery } from 'kotilogi-app/hooks/useQuery';
import Spinner from '../UI/Spinner';
import { RenderOnCondition } from '../Util/RenderOnCondition';

type SearchBarProps = React.ComponentProps<'input'> & {
  queryName?: string;
};

export function SearchBar({ queryName = 'q', ...props }: SearchBarProps) {
  const { updateQuery, status } = useQuery(queryName, '', 450);

  const loading = status === 'loading';
  return (
    <div className={`relative flex items-center flex-1 w-full`}>
      <input
        {...props}
        type='search'
        name={queryName}
        placeholder='Etsi...'
        onInput={updateQuery}
        className='flex-1 pl-7 shadow-md text-gray-500'
      />
      <div className='ml-2 absolute text-slate-500'>
        <RenderOnCondition
          condition={!loading}
          fallback={<Spinner />}>
          <i className='fa fa-search' />
        </RenderOnCondition>
      </div>
    </div>
  );
}
