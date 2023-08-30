import { useGallery } from "kotilogi-app/contexts/GalleryProvider";
import ItemCard, { ItemType } from "../Cards/ItemCard";
import Loading from "../Loading/Loading";
import styles from './gallery.module.scss';

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

                    console.log(destinationUrl);
                    
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