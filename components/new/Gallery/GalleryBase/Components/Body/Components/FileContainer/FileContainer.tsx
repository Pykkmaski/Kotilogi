import style from './style.module.scss';
import { useEffect, useState } from "react";
import NextImage from 'next/image';
import useGalleryContext from '../../../../GalleryContext';
import FileContainerMenu from './FileContainerMenu';
import serverImageIsMainImage from 'kotilogi-app/actions/serverImageIsMainImage';

export default function FileContainer(props: {
    /**
     * The item to display
     */
    item: any,
}){

    const [loading, setLoading]                         = useState(true);
    const [showImageMenu, setShowImageMenu]             = useState(false);
    const [isMainImage, setIsMainImage]                 = useState(false);
    const {props: {contentType, tableName, query}}      = useGalleryContext();

    const onError = (e) => {
        console.log('Image failed to load!');
        setLoading(false);
    }
    const onLoad = (e) => setLoading(false);

    const imageSrc = `/api/files/${props.item.id}?tableName=${tableName}`;
    
    useEffect(() => {
        const targetTableName = (
            tableName === 'propertyFiles' ? 'properties'
            :
            tableName === 'eventFiles' ? 'propertyEvents'
            :
            null
        );

        serverImageIsMainImage(props.item.id, query.refId, targetTableName)
        .then(result => {
            if(result === null) return;
            setIsMainImage(result);
        })
        .catch(err => console.log(err.message));
    }, []);

    var content: JSX.Element | null = null;

    if(contentType === 'image'){
        const imageClassName = isMainImage ? style.mainImage : style.file;

        content = <NextImage
            src={imageSrc}
            fill={true}
            alt="Kuva"
            onLoadingComplete={onLoad}
            onError={onError}
            className={imageClassName}
        />
    }
    else if(contentType === 'file'){
        content = <iframe src={`/api/files/${props.item.id}?tableName=${tableName}`} className={style.file}/>
    }
    
    return (
        <div 
            className={style.fileContainer}
            onMouseEnter={() => setShowImageMenu(true)} 
            onMouseLeave={() => setShowImageMenu(false)} 
            onBlur={() => setShowImageMenu(false)}
        >
            <FileContainerMenu 
                visible={showImageMenu} 
                openDestination={imageSrc} 
                item={props.item}
            />
            {content}
        </div>
    );
}