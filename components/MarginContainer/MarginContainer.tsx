import style from './style.module.scss';

type Props = {
    children: React.ReactNode,
}

export default function MarginContainer(props: Props){
    return (
        <div className={style.marginContainer}>
            {props.children}
        </div>
    );
}