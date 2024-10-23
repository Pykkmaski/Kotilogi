import { noScrollBar } from 'kotilogi-app/utils/noScrollBar';
import React, { useMemo } from 'react';

type GapWidthType = 'small' | 'medium' | 'large';
type AlignType = 'center' | 'start' | 'end' | 'baseline';
type JustifyType = 'center' | 'between' | 'evenly' | 'start' | 'end';
type DirectionType = 'row' | 'col';
type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

const gaps: Record<GapWidthType, string> = {
  small: 'xs:gap-0 sm:gap-1',
  medium: 'xs:gap-2 sm:gap-4',
  large: 'xs:gap-4 sm:gap-8',
};

export type SpacerProps = React.PropsWithChildren & {
  as?: string;
  direction?: DirectionType;
  directionFlipBreakpoint?: BreakpointType;
  gap?: GapWidthType;
  alignItems?: AlignType;
  justifyItems?: JustifyType;
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
  gap = 'medium',
  alignItems = 'start',
  justifyItems = 'start',
  width = 'auto',
  height = 'auto',
  directionFlipBreakpoint,
  wrap,
  ...props
}: SpacerProps) {
  const className = useSpacerClassName({
    direction,
    gap,
    alignItems,
    justifyItems,
    width,
    height,
    wrap,
    directionFlipBreakpoint,
  });

  return React.createElement(Component, { className, style: noScrollBar, ...props }, children);
}

function useSpacerClassName(props: SpacerProps) {
  return useMemo(() => {
    const {
      direction,
      alignItems,
      justifyItems,
      gap,
      wrap,
      width,
      height,
      directionFlipBreakpoint,
    } = props;
    const w =
      typeof width == 'number' || width == 'full' || width == 'auto'
        ? `w-${width}`
        : `w-[${width}]`;
    const h =
      typeof height == 'number' || height == 'full' || height == 'auto'
        ? `h-${height}`
        : `h-[${height}]`;

    return [
      `flex flex-${direction} ${h} ${w} items-${alignItems} justify-${justifyItems} overflow-x-scroll snap-mandatory`,
      directionFlipBreakpoint &&
        `${directionFlipBreakpoint}:flex-${direction == 'row' ? 'col' : 'row'}`,

      gaps[gap],
      wrap && 'flex-wrap',
    ]
      .join(' ')
      .trim();
  }, [props]);
}
