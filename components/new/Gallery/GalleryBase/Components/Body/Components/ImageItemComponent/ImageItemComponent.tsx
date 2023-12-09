import style from './style.module.scss';
import { useEffect, useState } from "react";
import NextImage, { StaticImageData } from 'next/image';
import useGalleryContext from '../../../../GalleryContext';
import FileContainerMenu from './FileContainerMenu';
import serverImageIsMainImage from 'kotilogi-app/actions/serverImageIsMainImage';
import Image from 'next/image';
import Link from 'next/link';
import serverSetAsMainImage from 'kotilogi-app/actions/serverSetAsMainImage';

export default function ImageItemComponent(props: {
    /**
     * The item to display
     */
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

    const className = props.isMain ? `${style.item} ${style.main}` : style.item;
    const [showMenu, setShowMenu] = useState(false);

    return (
       <div className={className} onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
            <div className={style.fileMenu} hidden={!showMenu}>
                <Link href={props.imageSrc} target="_blank">Avaa</Link>
                <span>Aseta Pääkuvaksi</span>
                <span className="danger">Poista</span>
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