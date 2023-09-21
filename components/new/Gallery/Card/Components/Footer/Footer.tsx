import { useCardContext } from "../../CardContext";
import style from './style.module.scss';

export default function Footer(){
    const {isSelected, dispatch, item, setMenuOpen, menuOpen} = useCardContext();
    
    const cogClassName = menuOpen ? `${style.cogImg} ${style.open}` : style.cogImg;
    return (
        <div className={style.container}>
            <input type="checkbox" checked={isSelected} onInput={() => dispatch({type: 'select_id', value: item.id})}/>
            <img src='/img/settings.png' className={cogClassName} onClick={() => setMenuOpen(prev => !prev)}></img>
        </div>
    )
}