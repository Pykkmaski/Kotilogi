'use client';

import { TypeNav } from '@/components/UsagePage/TypeNav';
import { Controls } from './Controls';
import Link from 'next/link';
import { useUsageProviderContext } from './UsageProvider';

export function Header() {
  const { displayYear } = useUsageProviderContext();

  return (
    <div className='w-full flex justify-between gap-4'>
      <div className='flex gap-4 items-center'>
        <h1 className='text-lg text-slate-500 mr-4'>Kulutustiedot</h1>
        <div className='xs:hidden lg:block'>
          <TypeNav>
            <Link href={`?type=all&year=${displayYear}`}>Kaikki</Link>
            <Link href={`?type=heat&year=${displayYear}`}>Lämmitys</Link>
            <Link href={`?type=water&year=${displayYear}`}>Vesi</Link>
            <Link href={`?type=electric&year=${displayYear}`}>Sähkö</Link>
          </TypeNav>
        </div>
      </div>

      <Controls />
    </div>
  );
}
