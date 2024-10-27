import React, { useMemo } from 'react';
import { ReactNode } from 'react';

export function useCheckIsValidReactElement(element: ReactNode) {
  useMemo(() => {
    if (!React.isValidElement(element)) {
      throw new Error('Passed element must be a valid React element!');
    }
  }, [element]);
}
