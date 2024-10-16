import { QueryFunction, useQuery } from '@tanstack/react-query';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { createContext } from 'react';

const DataFetcherProviderContext = createContext<{
  data: any;
  error: Error;
  isLoading: boolean;
}>(null);

type DataFetcherProviderProps = React.PropsWithChildren & {
  queryKey: [string];
  queryFn: QueryFunction;
};

/**
 * @experimental
 * @param param0
 * @returns
 */
export function DataFetcherProvider({ children, queryKey, queryFn }: DataFetcherProviderProps) {
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
  });
  return (
    <DataFetcherProviderContext.Provider value={{ data, isLoading, error }}>
      {children}
    </DataFetcherProviderContext.Provider>
  );
}

export const useDataFetcherProvider = createUseContextHook(
  'DataFetcherProvider',
  DataFetcherProviderContext
);
