import style from './style.module.scss';

export function Header({children}: React.PropsWithChildren){
    return (
        <div className={style.container}>
            {children}
        </div>
    );
}