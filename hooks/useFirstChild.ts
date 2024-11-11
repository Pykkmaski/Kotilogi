import React, { useMemo } from 'react';
import { ReactElement, ReactNode } from 'react';

/**Memoizes and returns the first child of the provided children. */
export function useFirstChild(children: ReactNode) {
  const [child] = useMemo(() => React.Children.toArray(children), [children]);
  return child;
}
