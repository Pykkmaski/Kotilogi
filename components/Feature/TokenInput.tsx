'use client';

import { useEffect, useRef, useState } from 'react';

export function TokenInput({
  children,
  value,
  name,
}: React.PropsWithChildren & { value: any; name: string }) {
  const [selected, setSelected] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = ref.current;
    if (input) {
      if (selected) {
        input.classList.add('bg-orange-500');
        input.classList.remove('border-orange-500');
      } else {
        input.classList.remove('bg-orange-500');
        input.classList.add('border-orange-500');
      }
    }
  }, [selected]);
  return (
    <div
      className='rounded-md relative flex p-4'
      ref={ref}>
      <input
        onChange={e => setSelected(e.target.checked)}
        type='radio'
        className='opacity-0'
        value={value}
        name={name}
      />
      {children}
    </div>
  );
}
