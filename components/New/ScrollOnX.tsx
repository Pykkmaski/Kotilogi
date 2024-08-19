export function ScrollOnX({ children }: React.PropsWithChildren) {
  return <div className='flex w-full overflow-x-scroll'>{children}</div>;
}
