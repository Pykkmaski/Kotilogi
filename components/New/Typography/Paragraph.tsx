export function Paragraph({ children }: React.PropsWithChildren) {
  return <p className='text-slate-500 xs:text-base md:text-lg'>{children}</p>;
}
