import Card from 'kotilogi-app/components/new/Gallery/Card/Card';
import Image from 'next/image';
import Link from 'next/link';

function getImageUrl(entry: any, dbTableName: Kotilogi.Table): string | null{
    const contentId: string = 'main_image_id' in entry ? entry.main_image_id : entry.id;

    const getImagesTableName = (): Kotilogi.Table | null => {
        if((['properties', 'property_images'] as Kotilogi.Table[]).includes(dbTableName)){
            return 'property_images';
        }

        if((['property_events', 'event_images'] as Kotilogi.Table[]).includes(dbTableName)){
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
    
    entry.imageUrl = getImageUrl(entry, dbTableName);

    if(dbTableName =='properties' || dbTableName == 'property_events'){
        return <Card item={entry} destination={destination!} key={`gallery-card-${key}`}/>
    }
    else if(dbTableName === 'property_images' || dbTableName === 'event_images'){
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
    }
    else if(dbTableName === 'event_files' || dbTableName === 'property_files'){
        //entry refers to a pdf file, return generic copy img.
       return <img src={'public/copy.png'}/>
    }
    else{
        return null;
    }
}