import style from './style.module.scss';

type Props = {
    text: string,
    onClick: (e) => void,
}

export default function Entry(props: Props){
    return (
        <option className={style.entryContainer} onClick={props.onClick}>
            {props.text}
        </option>
    );
}