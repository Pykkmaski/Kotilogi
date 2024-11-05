'use client';

import { SiteHeader } from '@/components/App/SiteHeader';
import React from 'react';

export default function TransparentHeaderLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='flex flex-col bg-white h-screen'>
      <SiteHeader variant='index' />
      {children}
    </div>
  );
}
