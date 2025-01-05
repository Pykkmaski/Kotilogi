import Link from 'next/link';

export function Header({ children }: React.PropsWithChildren) {
  return (
    <header
      className={`z-30 sticky top-0 left-0 w-full lg:px-[5rem] xs:px-2 bg-wf-background flex items-center gap-12 h-16 justify-between text-wf-header-text`}>
      {children}
    </header>
  );
}

type LogoContainerProps = React.PropsWithChildren & {
  logoColor?: 'white' | 'black';
};

/**Renders a container with the app logo, to be used within headers. */
Header.LogoContainer = function ({ children, logoColor = 'white' }: LogoContainerProps) {
  return (
    <div className='flex items-center gap-16'>
      <Link href='/'>
        <img
          src={logoColor == 'white' ? '/logo.png' : '/logo_black.png'}
          className='aspect-auto h-[30px]'
        />
      </Link>
      {children}
    </div>
  );
};

Header.MainNav = function ({ children }: React.ComponentProps<'nav'>) {
  return (
    <nav className={`text-[#dbdbdb] xs:hidden items-center gap-8 font-medium lg:flex`}>
      {children}
    </nav>
  );
};
