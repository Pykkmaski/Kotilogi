import Loading from "kotilogi-app/components/Loading/Loading";
import useGalleryContext from "../../GalleryContext";
import style from './style.module.scss';
import Spinner from "kotilogi-app/components/Spinner/Spinner";
import Error from "../Error/Error";

function LoadingBody(){
    return (
        <div className={style.loadingBody}>
            <Spinner size="2rem" />
        </div>
    );
}

type BodyProps = {
    
}

export default function Body(){
    const {state, props: {ItemComponent, displayStyle, children, errorComponent}} = useGalleryContext();
    const bodyClassName = displayStyle === 'list' ? style.galleryBodyList : style.galleryBodyGrid;

    return (
        state.error ? <h1>Tapahtui odottamaton virhe!</h1>
        :
        state.isLoading ? <LoadingBody/>
        :
        state.data.length ? 
        <>
            {children}
            <div className={bodyClassName} style={{gap: state.data.length ? '1rem' : 0}}>
                {
                    state.data.map((item, index: number) => {
                        return <ItemComponent item={item} key={`gallery-item-${index}`}/>
                    })
                }
            </div>
        </>
        :
        errorComponent
    );
}