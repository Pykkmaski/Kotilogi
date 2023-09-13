import Card from 'kotilogi-app/components/new/Gallery/Card/Card';
import getEntryAsItem from './getEntryAsItem';
import getCardDestination from './getCardDestination';
import { throwErrorIfNull } from 'kotilogi-app/utils/throwErrorIfNull';

export default function getCard(entry, contentType: GalleryBase.ContentType, key: number): JSX.Element | null{
    const item = getEntryAsItem(contentType, entry);
    const destination = getCardDestination(contentType, item.id);
    throwErrorIfNull(destination, 'Card destination cannot be null! contentType: (' + contentType + ')');
    
    const imageUrl = item.imageUrl;
    if(!imageUrl) throw new Error('getCard: imageUrl cannot be null!');

    if(contentType =='property' || contentType == 'event'){
        return <Card item={item} destination={destination!} key={`gallery-card-${key}`}/>
    }
    else if(contentType === 'property_image' || contentType === 'event_image'){
        return <Card item={item} destination={destination!} key={`gallery-card-${key}`}/>
    }
    else if(contentType === 'event_file' || contentType === 'property_file'){
        //entry refers to a pdf file, return generic copy img.
       return <img src={'public/copy.png'}/>
    }
    else{
        return null;
    }
}