import style from './style.module.scss';

type HeaderProps = React.PropsWithChildren & {
    border?: boolean,
}

export function Header({children, border}: HeaderProps){
    const containerStyle = {
        ...style,
        borderBottom: border ? '1px solid #DDD' : 'none',
        paddingBottom: border ? '1rem' : 'none',
    }

    return (
        <div style={containerStyle} className={style.container}>
            {children}
        </div>
    );
}

export function BorderHeader({children}){
    return (
        <Header border={true}>{children}</Header>
    );
}