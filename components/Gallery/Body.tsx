"use client";

import { useGallery } from "kotilogi-app/contexts/GalleryProvider";
import ItemCard, { ItemType } from "../Cards/ItemCard";
import Loading from "../Loading/Loading";
import styles from './gallery.module.scss';
import { deleteProperties } from "kotilogi-app/actions/deleteProperties";
import { deleteEvents } from "kotilogi-app/actions/deleteEvents";

export function Body(){
    const {data, contentType, options} = useGallery();

    const getContentItem = (entry: any): ItemType => {
        const item: ItemType = {
            title: contentType === 'property' ? entry.address : contentType === 'event' ? entry.name : 'none',
            description: entry.description,
            id: entry.id,
        }

        return item;
    }

    return (
        <div className={styles.galleryBody}>
            {
                data.length ? 
                data.map((entry, index: number) => {
                    const item = getContentItem(entry);
                    const destinationUrl = 
                    contentType === 'property' ? '/auth/properties/' + item.id + '/info'
                    : 
                    contentType === 'event' ? '/auth/events/' + item.id : '/login';

                    const deleteAction = 
                        contentType === 'property' ? (id: string) => deleteProperties([id]) : 
                        contentType === 'event' ? (id: string) => deleteEvents([id]) : null;
                    
                    return (
                        <ItemCard item={item} destinationUrl={destinationUrl} imageUrl={'/'} key={index} deleteAction={deleteAction}/>
                    )
                })
                :
                options.contentError
            }
        </div>
    );
}