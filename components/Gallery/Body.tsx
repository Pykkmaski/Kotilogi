"use client";

import { useGallery } from "kotilogi-app/contexts/GalleryProvider";
import ItemCard, { ItemType } from "../Cards/ItemCard";
import Loading from "../Loading/Loading";
import styles from './gallery.module.scss';
import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";

export function Body(){
    const {data, contentTarget, options} = useGallery();

    const getContentItem = (entry: any): ItemType => {
        const item: ItemType = {
            title: contentTarget === 'properties' ? entry.address : contentTarget === 'property_events' ? entry.name : 'none',
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
                    contentTarget === 'properties' ? '/auth/properties/' + item.id + '/info'
                    : 
                    contentTarget === 'property_events' ? '/auth/events/' + item.id : '/login';
                    return (
                        <ItemCard item={item} destinationUrl={destinationUrl} imageUrl={'/'} key={index}/>
                    )
                })
                :
                options.contentError
            }
        </div>
    );
}