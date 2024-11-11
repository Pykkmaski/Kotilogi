'use client';

import { createContext, ReactNode, useMemo } from 'react';
import { PassProps } from './PassProps';

type RenderOnConditionProps = React.PropsWithChildren & {
  [x: string]: any;
  condition: boolean | string | number | object;
  fallback?: ReactNode;
};

/**Renders its children when the provided condition is true, or the fallback if it is false.
 * Memoizes the rendering condition.
 */
export function RenderOnCondition({
  children,
  condition,
  fallback = null,
  ...props
}: RenderOnConditionProps) {
  const content = useMemo(
    () => (condition ? <PassProps {...props}>{children}</PassProps> : fallback),
    [children, condition, fallback, props]
  );

  return content;
}
