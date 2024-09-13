type HeaderProps = React.PropsWithChildren & {
  variant?: 'index';
};

export const Header = ({ variant = 'index', children }: HeaderProps) => {
  const classes = [
    'absolute flex w-full items-center justify-between 2xl:border-b-white xs:border-b-black border-b-[1px] py-4 2xl:px-36 xs:px-4 z-[20] xs:backdrop-blur-md 2xl:backdrop-blur-none',
  ];

  return <header className={classes.join(' ')}>{children}</header>;
};
