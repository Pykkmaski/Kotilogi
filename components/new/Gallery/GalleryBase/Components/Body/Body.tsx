import Loading from "kotilogi-app/components/Loading/Loading";
import useGalleryContext from "../../GalleryContext";
import style from './style.module.scss';
import Spinner from "kotilogi-app/components/Spinner/Spinner";
import Card from "./Components/Card/Card";
import FileContainer from "./Components/FileContainer/FileContainer";
import Error from "../../Error";
import { GalleryBase } from "../../declerations";

function LoadingBody(){
    return (
        <div className={style.loadingBody}>
            <Spinner size="2rem" />
        </div>
    );
}

export default function Body(){
    const {state, props: {contentType, tableName, query}} = useGalleryContext();

    const cards = state.isLoading || !state.data ? null : state.data.map((entry, index: number) => {
        switch(contentType as GalleryBase.ContentType){
            case 'object': {
                const destination = (
                    tableName === 'properties' ? `/auth/properties/new/${entry.id}/info?section=general`
                    :
                    undefined
                );

                return <Card item={entry} key={`gallery-card-${index}`} destination={destination}/>;
            }

            case 'image':
            case 'file':
                return <FileContainer item={entry} />

            default: {
                console.log(contentType);
                return <h1>Invalid content type!</h1>
            }
        }
    });
        
    return (
        state.error ? <h1>Tapahtui odottamaton virhe!</h1>
        :
        state.isLoading ? <LoadingBody/>
        :
        cards && cards.length ? <div className={style.galleryBody} style={{gap: state.data.length ? '1rem' : 0}}>
            {cards}
        </div>
        :
        <Error/>
    )
}