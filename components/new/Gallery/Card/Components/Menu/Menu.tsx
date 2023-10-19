import style from './style.module.scss';

type Props = {
    open: boolean,
    children: React.ReactNode,
}

export default function Menu(props: Props){
    return (
        <dialog className={style.menuContainer} open={props.open}>
            {props.children}
        </dialog>
    );
}