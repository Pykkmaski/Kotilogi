import useGalleryContext from '../../GalleryContext';
import ActionSelector from '../ActionSelector/ActionSelector';
import Entry from '../ActionSelector/Components/Entry/Entry';
import style from './style.module.scss';

type HeaderProps = {
    title: string,
    subTitle: string,
    buttons: JSX.Element[],
}

export default function Header(props: HeaderProps){
    const {dispatch} = useGalleryContext();

    return (
        <div className={style.galleryHeader}>
            <div className={style.titleContainer}>
                <h2>{props.title}</h2>
                <small>{props.subTitle}</small>
            </div>
            
            <div className={style.buttonsContainer}>
                {props.buttons}
            </div>
        </div>
    )
}