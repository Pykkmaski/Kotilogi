'use client';

import { useQuery } from 'kotilogi-app/hooks/useQuery';
import Spinner from '../UI/Spinner';
import { RenderOnCondition } from '../Util/RenderOnCondition';

type SearchBarProps = React.ComponentProps<'input'>;

export function SearchBar(props: SearchBarProps) {
  const { updateQuery, status } = useQuery('q', '', 450);

  const loading = status === 'loading';
  return (
    <div className={`relative flex items-center flex-1 w-full`}>
      <input
        type='search'
        name='query'
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
