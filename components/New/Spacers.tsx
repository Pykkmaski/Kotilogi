type SpacerProps = React.PropsWithChildren & {
  direction: 'row' | 'col';
  centered?: boolean;
};

/**Arranges its children with in a vertical or horizontal row, with gaps. */
export function Spacer({ children, direction, centered }: SpacerProps) {
  const className = [
    `flex flex-${direction} gap-4 w-full overflow-x-scroll`,
    centered ? 'items-baseline' : '',
  ];
  return <div className={className.join(' ')}>{children}</div>;
}

type SpaceBetweenProps = {
  firstElement: React.ReactNode;
  secondElement: React.ReactNode;
};

/**Arranges its first- and secondElement props horizontally, by pushing them to the edges of the parent element. */
export function SpaceBetween({ firstElement, secondElement }: SpaceBetweenProps) {
  return (
    <div className='flex flex-row justify-between w-full items-center'>
      {firstElement}
      {secondElement}
    </div>
  );
}
