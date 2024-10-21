import { noScrollBar } from 'kotilogi-app/utils/noScrollBar';
import React from 'react';

export type SpacerProps = React.PropsWithChildren & {
  as?: string;
  direction?: 'row' | 'col';
  gap?: number;
  alignItems?: 'center' | 'start' | 'end' | 'baseline';
  justifyItems?: 'center' | 'between' | 'evenly' | 'start' | 'end';
  width?: number | 'full' | 'auto' | string;
  height?: number | 'full' | 'auto' | string;
  wrap?: boolean;
  [x: string]: any;
};

/**Arranges its children within a vertical or horizontal row, with gaps. */
export function Spacer({
  children,
  as: Component = 'div',
  direction = 'row',
  gap = 0,
  alignItems = 'start',
  justifyItems = 'start',
  width = 'auto',
  height = 'auto',
  wrap = false,
  ...props
}: SpacerProps) {
  const w =
    typeof width == 'number' || width == 'full' || width == 'auto' ? `w-${width}` : `w-[${width}]`;
  const h =
    typeof height == 'number' || height == 'full' || height == 'auto'
      ? `h-${height}`
      : `h-[${height}]`;

  const className = [
    `flex flex-${direction} gap-${gap} ${h} ${w} items-${alignItems} justify-${justifyItems} overflow-x-scroll snap-mandatory`,
    wrap && 'flex-wrap',
  ];

  return React.createElement(
    Component,
    { className: className.join(' '), style: noScrollBar },
    children
  );
}
