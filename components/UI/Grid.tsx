type GridProps = React.PropsWithChildren;
export function Grid<T>({ children }: GridProps) {
  return <div className='flex xs:gap-2 md:gap-4 flex-wrap'>{children}</div>;
}
