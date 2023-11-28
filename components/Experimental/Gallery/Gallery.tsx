'use client';

import { useEffect, useReducer } from 'react';
import Card from './Components/Card/Card';
import style from './style.module.scss';
import reducer from './Util/reducer';
import { serverGetData } from 'kotilogi-app/actions/serverGetData';
import GalleryContextProvider from './Util/GalleryContext';
import Spinner from 'kotilogi-app/components/Spinner/Spinner';
import useData from 'kotilogi-app/hooks/useData';

function LoadingOverlay(){
    return (
        <div className={style.loadingOverlay}>
            <Spinner size="2rem"/>
        </div>
    )
}

function ErrorOverlay(){
    return (
        <div className={style.errorOverlay}>
            <h1>Sisällön Lataaminen epäonnistui!</h1>
            <button type="button" className="primary">Yritä Uudelleen</button>
        </div>
    );
}

type Props = {
    contentRefId: Kotilogi.IdType,
    contentType: 'property' | 'event' | 'image' | 'file',
    displayType: 'card' | 'list',

    headerContent: {
        title: string,
        subTitle: string,
    },

    addModalContent: JSX.Element,
    deleteModalContent?: JSX.Element,
}

/**
 * Displays data from a database.
 * @param props 
 * @returns 
 */
export default function Gallery(props: Props){
    const initialState = {
        data: [],
    };

    const contentDbSrc = (
        props.contentType === 'property' ? 'properties'
        :
        props.contentType === 'event' ? 'propertyEvents'
        :
        props.contentType === 'image' || props.contentType === 'file' ? 'files'
        :
        null
    );
    
    if(contentDbSrc === null) throw new Error('Invalid content database source!');

    var query: any = {
        refId: props.contentRefId,
    }

    switch(props.contentType){
        case 'image': query = {
            ...query,
            mimeType: 'image/jpeg',
        }
        break;

        case 'file': query = {
            ...query,
            mimeType: 'application/pdf',
        }
        break;
    }

    const {data, loading, error, addData, deleteData} = useData(contentDbSrc, query);
    const [state, dispatch] = useReducer(reducer, initialState as any);

    const contextValue = {
        loading,
        data,
        contentRefId: props.contentRefId,
        addModalContent: props.addModalContent,
        deleteModalContent: props.deleteModalContent,
        addData,
        deleteData,
        dispatch,
    }

    const contentWithData = (
        <>
            <GalleryContextProvider contextValue={contextValue}>
                <div className={style.header}>
                    <div>
                        <h1>{props.headerContent.title}</h1>
                        <small>{props.headerContent.subTitle}</small>
                    </div>
                </div>
                {
                    loading ? <LoadingOverlay/> 
                    :
                    error ? <ErrorOverlay/>
                    :
                    props.displayType === 'card' ? 
                    <div className={style.cardsBody}>
                        <Card type="add" key="gallery-add-card"/>
                        {data.map((item, index: number) => {
                            return (
                                <Card 
                                    type={'content'} 
                                    contentDbSrc={contentDbSrc}
                                    item={item}
                                    key={`gallery-card-${index}`}
                                />
                            )
                        })}
                        
                        <Card type="empty" key="gallery-empty-card"/>
                    </div>
                    :
                    null
                }
            </GalleryContextProvider>
        </>
        
    );

    return (
        <div className={style.container}>
            {
                error ? <ErrorOverlay/>
                :
                contentWithData
            }
        </div>
    )
}