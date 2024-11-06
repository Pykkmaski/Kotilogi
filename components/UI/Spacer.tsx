import { noScrollBar } from 'kotilogi-app/utils/noScrollBar';
import React, { useMemo } from 'react';

type GapWidthType = 'small' | 'medium' | 'large' | 'none';
type AlignType = 'center' | 'start' | 'end' | 'baseline';
type JustifyType = 'center' | 'between' | 'evenly' | 'start' | 'end';
type DirectionType = 'row' | 'col';
type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

const gaps: Record<GapWidthType, string> = {
  small: 'xs:gap-0 sm:gap-1',
  medium: 'xs:gap-2 sm:gap-4',
  large: 'xs:gap-4 sm:gap-8',
  none: 'gap-0',
};

export type SpacerProps = React.PropsWithChildren & {
  as?: string;
  dir?: DirectionType;
  dirFlipBreakpoint?: BreakpointType;
  gap?: GapWidthType;
  items?: AlignType;
  justify?: JustifyType;
  wrap?: boolean;
  full?: boolean;
  grow?: boolean;
  [x: string]: any;
};

/**Arranges its children within a vertical or horizontal row, with gaps. */
export function Spacer({
  children,
  as: Component = 'div',
  dir = 'row',
  gap = 'medium',
  items = 'start',
  justify = 'start',
  dirFlipBreakpoint,
  wrap,
  grow,
  full,
  ...props
}: SpacerProps) {
  const className = useSpacerClassName({
    dir,
    gap,
    items,
    justify,
    full,
    wrap,
    dirFlipBreakpoint,
    grow,
  });

  return React.createElement(Component, { className, style: noScrollBar, ...props }, children);
}

function useSpacerClassName(props: SpacerProps) {
  return useMemo(() => {
    const { dir, items, justify, gap, wrap, dirFlipBreakpoint, full, grow } = props;

    return [
      `flex flex-${dir} items-${items} justify-${justify} overflow-x-scroll snap-mandatory`,
      dirFlipBreakpoint && `${dirFlipBreakpoint}:flex-${dir == 'row' ? 'col' : 'row'}`,
      full && ((dir === 'row' && 'w-full') || 'h-full'),

      gaps[gap],
      wrap && 'flex-wrap',
      grow && 'flex-grow-1',
    ]
      .join(' ')
      .trim();
  }, [props]);
}
