'use client';

import { useQuery } from '@/hooks/useQuery';

export function TimeframeSelector({ children, ...props }: React.ComponentProps<'select'>) {
  const { updateQuery } = useQuery('year', null, 200);

  return (
    <select
      name='timespan'
      onChange={e => updateQuery(e)}>
      {children}
    </select>
  );
}
