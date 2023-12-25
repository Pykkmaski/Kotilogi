import Button from 'kotilogi-app/components/Button/Button';
import useGalleryContext from '../../GalleryContext';
import style from './style.module.scss';
import BinIcon from '@/assets/bin.png';
import PlusIcon from '@/assets/plus.png';
import AddButton from '../AddButton/AddButton';
import PageIndicator from '../PageIndicator/PageIndicator';
import { SearchField } from '../SearchField/SearchField';

export default function Header(props: {
    title: string,
}){
    const {state, dispatch, props: galleryProps} = useGalleryContext();

    const buttons = (
        <>
            {
                galleryProps.DeleteModal ? <Button
                    className="secondary"
                    desktopText="Poista"
                    disabled={state.selectedItems.length === 0}
                    mobileIconSrc={BinIcon}
                    onClick={() => dispatch({
                        type: 'toggle_delete_modal',
                        value: true,
                    })}
                /> : null
            }

            {
                galleryProps.AddModal ? <AddButton/> : null
            }
        </>
    )

    return (
        <div className={style.galleryHeader}>
            <div className={style.titleContainer}>
                <h2>{props.title}</h2>
            </div>

            <div className={style.buttonsContainer}>
                <SearchField/>    
                {buttons}
            </div>
        </div>
    )
}