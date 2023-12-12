import style from './style.module.scss';
import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import serverSetAsMainImage from 'kotilogi-app/actions/serverSetAsMainImage';
import toast from 'react-hot-toast';
import useGalleryContext from '../../../../GalleryContext';
import ItemComponent, { useItemComponentContext } from '../ItemComponent/ItemComponent';
import ItemDeleteModal from 'kotilogi-app/components/new/Gallery/Modals/ItemDeleteModal';

function Content(props: {
    imageSrc: string,
    isMain: boolean,

}){
    const [showMenu, setShowMenu] = useState(false);
    const [isMain, setIsMain] = useState(props.isMain);
    const {props: {tableName}} = useGalleryContext();
    const {setShowDeleteModal, item} = useItemComponentContext();

    const setMainImage = async (e) => {

        toast.loading('Asetetaan pääkuvaa...');

        const refType = (
            tableName.includes('property') ? 'property'
            :
            tableName.includes('event') ? 'event'
            :
            null
        );

        const error = await serverSetAsMainImage(item.id, item.refId, refType);
        if(error === 0){
            setIsMain(true);
            toast.success('Pääkuva vaihdettu onnistuneesti!');
        }
        else{
            toast.error('Pääkuvan vaihto epäonnistui!');
        }
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
            />
        </div>
    );
}
export default function ImageItemComponent(props: {
    item: any,
    /**
     * The source of the image.
     */
    imageSrc: string,

    /**
     * Is this image the main image?
     */
    isMain: boolean,
}){
    return (
        <ItemComponent item={props.item} DeleteModal={ItemDeleteModal}>
            <Content {...props}/>
        </ItemComponent>
    );
}