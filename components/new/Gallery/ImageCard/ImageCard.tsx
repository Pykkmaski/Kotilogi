import style from './style.module.scss';

type Props = {
    item: Kotilogi.ItemType & {imageSrc: string},
    destination: string,
}

function MenuButton(){
    return (
        <div className={style.menuButton}>
            <div className={style.buttonDot}></div>
            <div className={style.buttonDot}></div>
            <div className={style.buttonDot}></div>
        </div>
    )
}
export default function ImageCard(props: Props){
    return (
        <div className={style.imageCardContainer}>
            <MenuButton/>
            <span className={style.title}>{props.item.title}</span>
            <img className={style.image} src={props.item.imageSrc} alt="Ei Kuvaa"/>
        </div>
    );
}