import useGalleryContext from "kotilogi-app/components/new/Gallery/GalleryBase/GalleryContext";
import { useCardContext } from "../../CardContext";
import style from './style.module.scss';

export default function Footer(){
    const {isSelected, props: {item}, setMenuOpen, menuOpen} = useCardContext();
    const {dispatch} = useGalleryContext();
    
    const cogClassName = menuOpen ? `${style.cogImg} ${style.open}` : style.cogImg;

    const handleSettingsButtonClick = () => {
        setMenuOpen(prev => !prev);
    }

    const showSettingsButton = true;

    return (
        <div className={style.container}>
            <input type="checkbox" checked={isSelected} onInput={() => dispatch({type: 'select_item', value: item})}/>
            {
                showSettingsButton ? 
                <img src='/img/settings.png' className={cogClassName} onClick={handleSettingsButtonClick}></img>
                :
                null
            }
        </div>
    )
}