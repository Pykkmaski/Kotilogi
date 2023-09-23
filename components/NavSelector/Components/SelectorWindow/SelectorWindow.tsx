import style from './style.module.scss';

type Props = {
    open: boolean,
    children: React.ReactNode,
}

export default function SelectorWindow(props: Props){
    return (
        <div className={style.selectorWindowContainer} hidden={!props.open}>
            {props.children}
        </div>
    );
}