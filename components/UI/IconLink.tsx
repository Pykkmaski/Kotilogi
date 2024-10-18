'use client';

import Link from 'next/link';
import style from './styles/IconLink.module.scss';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { RenderOnCondition } from '../Util/RenderOnCondition';

/**The background of the link displayed when on the route the link points to. */
function SelectedBackground() {
  const className = [style.selectedBackground, 'shadow-lg'];

  return <div className={className.join(' ')} />;
}

/**The indicator on the left border displayed when on the route the link points to. */
function SelectedIndicator() {
  return <div className={style.selectedIndicator} />;
}

type IconLinkProps = React.ComponentProps<typeof Link> & {
  imageSrc: string;
  selected?: boolean;
  /**Use a font awesome icon. */
  icon?: string;
};

export default function IconLink({ imageSrc, selected, icon, ...props }: IconLinkProps) {
  const className = selected ? `${style.container} ${style.selected}` : style.container;
  const textClassName = [
    'z-10 decoration-none hover:no-underline w-full',
    selected ? 'text-black' : 'text-white',
  ];

  const imageClassName = [icon, selected ? 'filter-none' : 'invert'];

  return (
    <Link
      {...props}
      className={className.toString()}>
      <RenderOnCondition condition={selected}>
        <SelectedIndicator />
        <SelectedBackground />
      </RenderOnCondition>

      <RenderOnCondition condition={icon != undefined}>
        <i
          className={`z-10 fa ${icon} text-center text-base ${
            selected ? 'text-black' : 'text-white'
          }`}
        />
      </RenderOnCondition>

      <div className={textClassName.join(' ')}>{props.children}</div>
    </Link>
  );
}
