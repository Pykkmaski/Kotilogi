import React from 'react';
import { ReactNode, useMemo } from 'react';

/**Throws an error if there are not exactly the number of children as specified. */
export function useChildCount(children: ReactNode, count: number, errorMessage: string) {
  useMemo(() => {
    if (React.Children.count(children) != count) {
      throw new Error(errorMessage);
    }
  }, [children, count, errorMessage]);
}
