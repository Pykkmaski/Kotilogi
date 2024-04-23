'use client';

import { Controls } from './Controls';
import { UsageTypeNav } from './UsageTypeNav';

export function Header() {
  return (
    <div className='w-full flex justify-between gap-4'>
      <div className='flex gap-4 items-center'>
        <h1 className='text-lg text-slate-500 mr-4'>Kulutustiedot</h1>
        <div className='xs:hidden lg:block'>
          <UsageTypeNav />
        </div>
      </div>

      <Controls />
    </div>
  );
}
