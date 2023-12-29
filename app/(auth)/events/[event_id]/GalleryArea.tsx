'use client';

import { useSearchParams } from "next/navigation";
import style from './style.module.scss';
import ImageGallery from "kotilogi-app/components/new/Gallery/ImageGallery/ImageGallery";
import Link from "next/link";
import FileGallery from "kotilogi-app/components/new/Gallery/FileGallery/FileGallery";
import { useEventContext } from "./EventContext";

export default function GalleryArea(){
    const {event: {id: eventId}} = useEventContext();
    
    const searchParams = useSearchParams();
    const currentData = searchParams.get('data');
    if(!currentData) throw new Error('No data query present in url!');

    const gallery = (
        currentData === 'images' ? 
        <ImageGallery 
            tableName='eventFiles'
            refId={eventId}
        />  
        :
        <FileGallery
            tableName='eventFiles'
            refId={eventId}
        />
    );

    return (
        <div className={style.galleryArea}>
            <nav className="overhead">
                <Link href="?data=images">Kuvat</Link>
                <Link href="?data=files">Tiedostot</Link>
            </nav>
            
            {gallery}
        </div>
    )
}