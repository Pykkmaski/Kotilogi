import Card from 'kotilogi-app/components/new/Gallery/Card/Card';
import Image from 'next/image';
import Link from 'next/link';

function getImageUrl(entry: any, dbTableName: Kotilogi.Table): string | null{
    /**
     * Returns the url to the main image for an entry, or the image itself, if entry represents the image.
     * @param {any} entry The entry object. Should be an entry from one of the database tables.
     * @param {Kotilogi.Table} dbTableName The name of the database table from where the gallery data originates.
     * @returns {string | null} The url to the image, or null if not applicable.
     */

    const contentId: string = 'main_image_id' in entry ? entry.main_image_id : entry.id;

    const getImagesTableName = (): Kotilogi.Table | null => {
        if(String('properties property_images').includes(dbTableName)){
            return 'property_images';
        }

        if(String('property_events event_images').includes(dbTableName)){
            return 'event_images';
        }

        return null;
    }

    const imagesTableName: Kotilogi.Table | null = getImagesTableName();
    if(!imagesTableName) return null;

    const url = `/api/files?dbTableName=${imagesTableName}&id=${contentId}`;
    return  url;
}

function getCardDestination(dbTableName: Kotilogi.Table, contentId: Kotilogi.IdType): string{
    if(dbTableName == 'properties'){
        return `/auth/properties/${contentId}/info`;
    }
    else if(dbTableName == 'property_events'){
        return `/auth/events/${contentId}`;
    }
    else{
        return `/api/files/${contentId}?dbTableName=${dbTableName}`;
    }
}

export default function getCard(entry, dbTableName: Kotilogi.Table, key: number): JSX.Element | null{
    const destination = getCardDestination(dbTableName, entry.id);
    
    entry.imageUrl = getImageUrl(entry, dbTableName) || '/copy.png';

    //TODO: Return unique cards based on what type of content is in the gallery.
    if(dbTableName =='properties' || dbTableName == 'property_events'){
        return <Card item={entry} destination={destination!} key={`gallery-card-${key}`}/>
    }
    else if(dbTableName === 'property_images' || dbTableName === 'event_images'){
        /*
        return (
            <Link href={entry.imageUrl} target="_blank" className="image-link">
                <Image
                    src={entry.imageUrl}
                    objectFit='contain'
                    alt="Image"
                    fill={true}
                    quality={20}
                    placeholder='blur'
                    blurDataURL='img/image.png'
                />
            </Link>
        )
        */

        return <Card item={entry} destination={destination!} key={`gallery-card-${key}`}/>
    }
    else if(dbTableName === 'event_files' || dbTableName === 'property_files'){
        //entry refers to a pdf file, return generic copy img.
       return <Card item={entry} destination={destination!} key={`gallery-card-${key}`}/>
    }
    else{
        return null;
    }
}