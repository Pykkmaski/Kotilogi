import Loading from "kotilogi-app/components/Loading/Loading";
import useGalleryContext from "../../GalleryContext";
import style from './style.module.scss';
import Spinner from "kotilogi-app/components/Spinner/Spinner";
import Card from "./Components/Card/Card";
import FileContainer from "./Components/FileContainer/FileContainer";
import Error from "../../Error";
import { GalleryBase } from "../../declerations";
import InvalidContentError from "./Components/InvalidContentError/InvalidContentError";
import ListEntry from "./Components/ListEntry/ListEntry";

function LoadingBody(){
    return (
        <div className={style.loadingBody}>
            <Spinner size="2rem" />
        </div>
    );
}

export default function Body(){
    const {state, props: {contentType, tableName, query, children, displayStyle}} = useGalleryContext();

    const cards = state.isLoading || !state.data ? null : state.data.map((entry, index: number) => {
        switch(contentType as GalleryBase.ContentType){
            case 'object': {
                const destination = (
                    tableName === 'properties' ? `/auth/properties/new/${entry.id}/info?section=general`
                    :
                    undefined
                );
                
                if(displayStyle === 'list') return  <ListEntry item={entry}/>

                return <Card item={entry} key={`gallery-card-${tableName}-${index}`} destination={destination}/>;
            }

            case 'usage':{
                return <ListEntry item={entry} key={`gallery-list-entry-${tableName}-${index}`}/>
            }

            case 'image':
            case 'file':
                return <FileContainer item={entry} key={`gallery-file-${tableName}-${index}`}/>

            default: {
                return <InvalidContentError/>
            }
        }
    });

    const extraContent = (
        <div className={style.extraContent}>
            {children}
        </div>
    );

    const bodyClassName = (
        displayStyle === 'list' && (contentType !== 'image' || contentType !== 'file') ? style.galleryBodyList 
        :
        style.galleryBodyGrid 
        
    );

    const galleryContent = (
        <div className={bodyClassName} style={{gap: state.data.length ? '1rem' : 0}}>
            {cards}
        </div>
    );

    const body = (
        cards && cards.length ?
        children ?
        <>
            {extraContent}
            {galleryContent}
        </>
        :
        galleryContent
        :
        <Error/>
    );
    
    return (
        state.error ? <h1>Tapahtui odottamaton virhe!</h1>
        :
        state.isLoading ? <LoadingBody/>
        :
        body
    );
}