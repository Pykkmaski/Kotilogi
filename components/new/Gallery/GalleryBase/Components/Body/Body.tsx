import Loading from "kotilogi-app/components/Loading/Loading";
import useGalleryContext from "../../GalleryContext";
import getCard from "../../Util/getCard";
import style from './style.module.scss';

type BodyProps = {
    error: JSX.Element,
}

export default function Body(props: BodyProps){
    const {state, dbTableName} = useGalleryContext();

    const cards = state.data.map((entry, index: number) => {
        return getCard(entry, dbTableName, index);
    });

    const loadingMessage = 
        dbTableName === 'properties' ? 'Ladataan Taloja...' 
        : 
        dbTableName === 'propertyEvents' ? 'Ladataan Tapahtumia...'
        :
        dbTableName.includes('Images') ? 'Ladataan Kuvia...'
        :
        dbTableName.includes('Files') ? 'Ladataan Tiedostoja...'
        :
        'Ladataan...';
        
    return (
        <div className={style.galleryBody} style={{gap: state.data.length ? '1rem' : 0}}>
            {
                cards.length ? cards : state.isLoading ? <Loading message={loadingMessage}/> : props.error
            }
        </div>
    )
}