import React, { useMemo } from 'react';
import { ReactElement, ReactNode } from 'react';

export function useFirstChild(children: ReactNode) {
  const [child] = useMemo(() => React.Children.toArray(children), [children]);
  return child;
}
