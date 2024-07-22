export function HideOnMobile({ children }: React.PropsWithChildren) {
  return <div className='xs:hidden md:visible'>{children}</div>;
}
