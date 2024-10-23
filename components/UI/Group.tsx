type GroupProps = React.PropsWithChildren & {
  direction: 'col' | 'row';
  gap?: number;
  justify?: 'start' | 'end' | 'center' | 'between';
  center?: boolean;
  align?: 'start' | 'end' | 'center' | 'baseline';
};

/**A wrapper to arrange it's children in a row or a column.
 * @deprecated
 */
export function Group({
  children,
  justify = 'start',
  direction = 'col',
  gap = 0,
  center = false,
  align = 'start',
}: GroupProps) {
  const className = [
    'flex',
    `flex-${direction}`,
    `gap-${gap}`,
    center ? 'items-center' : 'items-start',
    `justify-${justify}`,
    `items-${align}`,
  ];

  return <div className={className.join(' ')}>{children}</div>;
}
