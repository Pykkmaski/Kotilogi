import { ReactNode } from 'react';
import { PassProps } from './PassProps';

type RenderOnConditionProps = React.PropsWithChildren & {
  condition: boolean;
  fallback?: ReactNode;
};

export function RenderOnCondition({
  children,
  condition,
  fallback = null,
  ...props
}: RenderOnConditionProps) {
  return (condition && <PassProps {...props}>{children}</PassProps>) || fallback;
}
