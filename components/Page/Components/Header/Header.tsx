import style from './style.module.scss';

type Props = {
    children: React.ReactNode,
}

export default function Header(props: Props){
    return (
        <div className={style.pageHeaderContainer}>
            {props.children}
        </div>
    )
}