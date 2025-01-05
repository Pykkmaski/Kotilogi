import { useMemo } from 'react';

export function TabButton({ children, isSelected = null, ...props }) {
  const className = useMemo(() => {
    return [isSelected && 'border-b-[2px] border-gray-500', 'p-1 box-border text-black'].join(' ');
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
