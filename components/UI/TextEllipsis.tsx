export function TextEllipsis({ children }: React.PropsWithChildren) {
  return <div className='max-w-[500px] text-nowrap text-ellipsis overflow-hidden'>{children}</div>;
}
