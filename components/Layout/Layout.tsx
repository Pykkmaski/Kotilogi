import style from './style.module.scss';

/**Renders the children with a pre-determined style required by the design of the page. */
export function Layout({children}: React.PropsWithChildren){
    return (
        <div className={style.container}>
            {children}
        </div>
    );
}