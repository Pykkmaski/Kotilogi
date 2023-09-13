import Card from 'kotilogi-app/components/new/Gallery/Card/Card';
import getEntryAsItem from './getEntryAsItem';
import getCardDestination from './getCardDestination';
import { throwErrorIfNull } from 'kotilogi-app/utils/throwErrorIfNull';
import getImageUrl from './getImageUrl';

export default function getCard(entry, contentType: GalleryBase.ContentType, key: number): JSX.Element | null{
    const item = getEntryAsItem(entry);
    const destination = getCardDestination(contentType, item.id);
    throwErrorIfNull(destination, 'Card destination cannot be null! contentType: (' + contentType + ')');
    
    const imageUrl = getImageUrl(contentType, item.id); //Will be null when entry refers to a pdf file.

    if(contentType =='property' || contentType == 'event'){
        return <Card item={item} destination={destination!} imageUrl={imageUrl} key={`gallery-card-${key}`}/>
    }
    else if(contentType === 'property_image' || contentType === 'event_image'){
        return <img src={'/'}/>
    }
    else if(contentType === 'event_file' || contentType === 'property_file'){
        //entry refers to a pdf file, return generic copy img.
       return <img src={'public/copy.png'}/>
    }
    else{
        return null;
    }
}