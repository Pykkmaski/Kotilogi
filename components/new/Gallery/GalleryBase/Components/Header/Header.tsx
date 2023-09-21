import style from './style.module.scss';

type HeaderProps = {
    title: string,
    subTitle: string,
    buttons: JSX.Element[],
}

export default function Header(props: HeaderProps){
    return (
        <div className={style.header}>
            <div className={style.titleContainer}>
                <h1>{props.title}</h1>
                <small>{props.subTitle}</small>
            </div>

            <div className={style.buttonsContainer}>
                {props.buttons}
            </div>
        </div>
    )
}