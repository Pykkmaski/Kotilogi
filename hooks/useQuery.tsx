import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 *
 * @param queryParamName
 * @returns The onChange function to be used by the input performing the query.
 */
export function useQuery(queryParamName: string, initialQueryValue: string | null, queryDelay: number = 0) {
  const router = useRouter();
  const route = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQueryValue);
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');

  const updateQuery = e => {
    setQuery(e.target.value);
  };

  const updateQueryDirectly = (newQuery: string) => {
    setQuery(newQuery);
  };

  useEffect(() => {
    setStatus('loading');
    const timeout = setTimeout(() => {
      const currentQuery = new URLSearchParams(searchParams);
      currentQuery.set(queryParamName, query);
      router.push(route + `?${currentQuery.toString()}`);
      setStatus('idle');
    }, queryDelay);

    return () => clearTimeout(timeout);
  }, [query]);

  return { updateQuery, updateQueryDirectly, currentQuery: query, status } as const;
}
