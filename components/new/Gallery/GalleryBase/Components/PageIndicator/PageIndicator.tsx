import useGalleryContext from "../../GalleryContext";
import style from './style.module.scss';

export default function PageIndicator(){
    const {state, dispatch} = useGalleryContext();
    const increase = () => dispatch({
        type: 'set_page_number',
        value: state.currentPage + 1,
    });

    const decrease = () => dispatch({
        type: 'set_page_number',
        value: state.currentPage - 1,
    });

    return (
        <div className={style.pageIndicator}>
            <div className={style.button} onClick={decrease}></div>
            <span className={style.number}>{state.currentPage}</span>
            <div className={style.button} onClick={increase}></div>
        </div>
    )
}