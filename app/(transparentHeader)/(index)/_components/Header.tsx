type HeaderProps = React.PropsWithChildren & {
  variant: 'index';
};

export function Header({ variant, children }: HeaderProps) {
  return (
    <header className='absolute flex w-full items-center justify-between border-b- border-b-[1px] py-4 lg:px-[100px] xs:px-4 z-[10]'>
      {children}
    </header>
  );
}
