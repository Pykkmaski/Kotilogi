'use client';

import { useQuery } from 'kotilogi-app/hooks/useQuery';
import Spinner from './Spinner/Spinner';

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
        {loading ? <Spinner size='1rem' /> : <i className='fa fa-search' />}
      </div>
    </div>
  );
}
