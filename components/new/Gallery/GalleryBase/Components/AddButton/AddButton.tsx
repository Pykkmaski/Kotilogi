import useGalleryContext from "../../GalleryContext";
import style from './style.module.scss';

export default function AddButton(){
    const {dispatch} = useGalleryContext();

    return (
        <>
            <button id={style.desktopAddButton} className="primary add" type="button" onClick={() => dispatch({type: 'toggle_add_modal', value: true})}>Lisää Uusi</button>
            {/**Mobile devices */}
            <div className={style.mobileAddButton} onClick={() => dispatch({type: 'toggle_add_modal', value: true})}>
                <img src="/img/Icons/plus.png"></img>
            </div>
        </>
    );
}