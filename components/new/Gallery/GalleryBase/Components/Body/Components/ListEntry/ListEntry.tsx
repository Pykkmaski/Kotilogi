import style from './style.module.scss';

function Body(props: React.PropsWithChildren){
    return (
        <span className={style.title}>
            {props.children}
        </span>
    );
}

/**
 * Entries to display when a gallery is configured with the display type of list.
 * @param props 
 */
export default function ListEntry(props: React.PropsWithChildren & {
    MenuComponent: JSX.Element,
}){
    return (
        <>
            <div className={style.listEntry}>
                {props.MenuComponent}
                <Body>
                    {props.children}
                </Body>
            </div>
        </>
    );
}