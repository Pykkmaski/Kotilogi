'use client';

import Link from 'next/link';
import { Group } from '../Group';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { colors } from 'kotilogi-app/apex.config';

export function TypeNav({ children }) {
  const searchParams = useSearchParams();
  const currentParam = searchParams.get('type');

  return (
    <nav>
      <div className='flex flex-row gap-1 items-center'>
        {React.Children.map(children, (child: React.ReactElement<HTMLAnchorElement>) => {
          const params = new URLSearchParams(child.props.href);
          const typeName = params.get('type');
          const baseClassName =
            'p-1 flex justify-center items-center rounded-lg min-w-[70px] text-black text-sm no-underline cursor-pointer [&>*]:w-full [&>*]:h-full [&>*]:flex [&>*]:justify-center';

          if (params.get('type') === currentParam) {
            const selectedClassName = [
              'font-semibold shadow-md',
              typeName === 'heat' ? `bg-heat text-white` : typeName === 'water' ? `bg-water text-white` : `bg-electric text-black`,
              baseClassName,
            ];

            return <div className={selectedClassName.join(' ')}>{child}</div>;
          } else {
            const className = ['border border-gray-200 hover:bg-slate-100', baseClassName];

            return <div className={className.join(' ')}>{child}</div>;
          }
        })}
      </div>
    </nav>
  );
}
