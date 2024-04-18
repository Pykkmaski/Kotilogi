import style from './style.module.scss';

type HeaderProps = React.PropsWithChildren & {
  border?: boolean;
};

export function Header({ children, border }: HeaderProps) {
  const containerStyle = {
    ...style,
    borderBottom: border ? '1px solid #DDD' : 'none',
    paddingBottom: border ? '1rem' : 'none',
  };

  const className = ['flex flex-row w-full mb-8', border ? 'border-b-[1px] border-b-slate-200 pb-4' : undefined];

  return <div className={className.join(' ')}>{children}</div>;
}

export function BorderHeader({ children }) {
  return <Header border={true}>{children}</Header>;
}
