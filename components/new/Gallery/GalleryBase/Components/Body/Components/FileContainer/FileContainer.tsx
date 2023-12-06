import style from './style.module.scss';
import { useState } from "react";
import NextImage from 'next/image';
import Spinner from "kotilogi-app/components/Spinner/Spinner";
import useGalleryContext from '../../../../GalleryContext';
import FileContainerMenu from './FileContainerMenu';

export default function FileContainer(props: {
    /**
     * The item to display
     */
    item: any,
}){

    const [loading, setLoading]             = useState(true);
    const [showImageMenu, setShowImageMenu] = useState(false);
    const {props: {contentType, tableName}}            = useGalleryContext();

    const onError = (e) => {
        console.log('Image failed to load!');
        setLoading(false);
    }
    const onLoad = (e) => setLoading(false);

    const imageSrc = `/api/files/${props.item.id}?tableName=${tableName}`;

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
            {
                false  ? 
                <Spinner size={'2rem'}/>
                :
                contentType === 'image' ? 
                <NextImage
                    src={imageSrc}
                    fill={true}
                    alt="Kuva"
                    onLoadingComplete={onLoad}
                    onError={onError}
                    className={style.file}
                />
                :
                contentType === 'file' ? 
                <iframe src={`/api/files/${props.item.id}`} className={style.file}/>
                :
                null
            }
        </div>
    )
}