import { memo, ReactNode, useMemo } from 'react';
import { PassProps } from './PassProps';

type RenderOnConditionProps = React.PropsWithChildren & {
  condition: boolean;
  fallback?: ReactNode;
};

/**Renders its children when the provided condition is true, or the fallback if it is false.
 * Memoizes the rendering condition internally.
 */
export function RenderOnCondition({
  children,
  condition,
  fallback = null,
  ...props
}: RenderOnConditionProps) {
  const result = useMemo(() => {
    return condition ? <PassProps {...props}>{children}</PassProps> : fallback;
  }, [children, fallback, condition]);

  return result;
}
