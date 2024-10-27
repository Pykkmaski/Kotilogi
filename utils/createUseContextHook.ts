import { useContext } from 'react';

export function createUseContextHook<T extends React.Context<any>>(
  contextName: string,
  context: T
) {
  return function (): React.ContextType<T> {
    const ctx = useContext(context);
    if (!ctx)
      throw new Error(`use${contextName} can only be used within the scope of a ${contextName}`);
    return ctx;
  };
}
