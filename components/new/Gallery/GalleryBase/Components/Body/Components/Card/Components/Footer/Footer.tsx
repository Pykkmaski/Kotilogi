import { useCardContext } from "../../CardContext";
import style from './style.module.scss';

export default function Footer(){
    const {isSelected, dispatch, item, setMenuOpen, menuOpen} = useCardContext();
    
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