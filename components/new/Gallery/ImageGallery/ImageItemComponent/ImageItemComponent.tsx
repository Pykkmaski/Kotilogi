import style from './style.module.scss';
import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import {setMainImage as serverSetMainImage} from 'kotilogi-app/actions/file/setMainImage';
import toast from 'react-hot-toast';
import ItemComponent, { useItemComponentContext } from '../../GalleryBase/Components/Body/Components/ItemComponent/ItemComponent';
import FileDeleteModal from '../../Modals/FileDeleteModal';
import { useGalleryContext } from '../../GalleryBase/Gallery';

const getRefTableName = (fileTableName: 'propertyFiles' | 'eventFiles') => {
    return fileTableName === 'propertyFiles' ? 'properties' : 'propertyEvents';
}

function Content(props: {
    imageSrc: string,
    isMain: boolean
}){
    const [showMenu, setShowMenu] = useState(false);
    const {props: {tableName}} = useGalleryContext();
    const {setShowDeleteModal, item} = useItemComponentContext();
    const [isMain, setIsMain] = useState(props.isMain);

    const setMainImage = async (e) => {
        toast.loading('Asetetaan pääkuvaa...');

        const refTableName = getRefTableName(tableName as 'propertyFiles' | 'eventFiles');
        serverSetMainImage(item.id, item.refId, refTableName)
        .then(res => {
            setIsMain(true);
        })
        .catch(err => toast.error('Pääkuvan asetus epäonnistui!'));
    }

    const className = isMain ? `${style.item} ${style.main}` : style.item;

    return (
        <div className={className} onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
            <div className={style.fileMenu} hidden={!showMenu}>
                <Link href={props.imageSrc} target="_blank">Avaa</Link>
                <span className={style.controlButton} onClick={setMainImage} hidden={isMain}>Aseta Pääkuvaksi</span>
                <span className={`${style.controlButton} danger`} onClick={() => setShowDeleteModal(true)}>Poista</span>
            </div>

            <Image
                fill={true}
                objectFit='contain'
                alt=""
                src={props.imageSrc}
                quality={25}
            />
        </div>
    );
}

/**
 * A Component for respresenting image-content in galleries.
 * @param props 
 * @returns 
 */

export default function ImageItemComponent(props: {
    /**
     * The image data contained on the database.
     */
    item: any,
    
    /**
     * The source of the image.
     */
    imageSrc: string,

    /**
     * Is this image the main image of the target this image belongs to?
     */
    isMain: boolean,
}){
    return (
        <ItemComponent item={props.item} DeleteModal={FileDeleteModal}>
            <Content {...props}/>
        </ItemComponent>
    );
}