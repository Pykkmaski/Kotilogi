import Card from 'kotilogi-app/components/new/Gallery/Card/Card';
import Image from 'next/image';
import Link from 'next/link';
import ImageCard from '../../ImageCard/ImageCard';

/**
 * Returns the url to the main image for an entry, or the image itself, if entry represents the image.
 * @param {any} entry The entry object. Should be an entry from one of the database tables.
 * @param {Kotilogi.Table} dbTableName The name of the database table from where the gallery data originates.
 * @returns {string | null} The url to the image, or null if not applicable.
 */

function getImageUrl(entry: any, dbTableName: Kotilogi.Table): string | null{
    

    const contentId: string = 'mainImageId' in entry ? entry.mainImageId : entry.id;

    const getImagesTableName = (): Kotilogi.Table | null => {
        if(String('properties propertyImages').includes(dbTableName)){
            return 'propertyImages';
        }

        if(String('propertyEvents eventImages').includes(dbTableName)){
            return 'eventImages';
        }

        if(String('propertyFiles'.includes(dbTableName))){
            return 'propertyFiles';
        }

        return null;
    }

    const imagesTableName: Kotilogi.Table | null = getImagesTableName();
    if(!imagesTableName) return null;

    const url = `/api/files?dbTableName=${imagesTableName}&id=${contentId}`;
    return url;
}

export function getCardDestination(dbTableName: Kotilogi.Table, contentId: Kotilogi.IdType, refId?: Kotilogi.IdType): string{
    if(dbTableName == 'properties'){
        return `/auth/properties/${contentId}/info`;
    }
    else if(dbTableName == 'propertyEvents'){
        if(!refId) throw new Error('getCardDestination: refId must be defined if dbTableName is propertyEvents!');
        return `/auth/events/${contentId}/info`;
    }
    else{
        return `/api/files/${contentId}?dbTableName=${dbTableName}`;
    }
}

export default function getCard(entry, dbTableName: Kotilogi.Table, key: number): JSX.Element | null{
    const destination = getCardDestination(dbTableName, entry.id, entry.refId);
    
    entry.imageUrl = getImageUrl(entry, dbTableName) || '/img/Files/default.jpg';

    //TODO: Return unique cards based on what type of content is in the gallery.
    switch(dbTableName){
        default: return <Card item={entry} destination={destination!} key={`gallery-card-${key}`}/>;
    }
}