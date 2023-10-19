import useGalleryContext from "../../../GalleryBase/GalleryContext";
import { useCardContext } from "../../CardContext";
import Menu from "../Menu/Menu";
import style from './style.module.scss';
import { useRouter } from "next/navigation";

export default function Footer(){
    const {isSelected, dispatch, item, setMenuOpen, menuOpen} = useCardContext();
    const {dbTableName} = useGalleryContext();
    const router = useRouter();

    const cogClassName = menuOpen ? `${style.cogImg} ${style.open}` : style.cogImg;

    const handleSettingsButtonClick = () => {
        if(dbTableName === 'properties'){
            
        }
        else{
            setMenuOpen(prev => !prev);
        }
    }

    const showSettingsButton = true;

    return (
        <div className={style.container}>
            <input type="checkbox" checked={isSelected} onInput={() => dispatch({type: 'select_id', value: item.id})}/>
            {
                showSettingsButton ? 
                <img src='/img/settings.png' className={cogClassName} onClick={handleSettingsButtonClick}></img>
                :
                null
            }
        </div>
    )
}