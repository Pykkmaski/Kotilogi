import style from './style.module.scss';

type Props = {
    title: string,
    value: string | number,
}

export default function InfoEntry(props: Props){
    return (
        <div className={style.infoEntryContainer}>
            {props.title}
            <span className={style.value}>{props.value}</span>
        </div>
    );
}