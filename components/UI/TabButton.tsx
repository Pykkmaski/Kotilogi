import { useMemo } from 'react';

export function TabButton({ children, isSelected = null, ...props }) {
  const className = useMemo(() => {
    return [isSelected && 'border-b-[2px] border-secondary', 'p-1 box-border'].join(' ');
  }, [isSelected]);

  return (
    <button
      {...props}
      type='button'
      className={className}>
      {children}
    </button>
  );
}
