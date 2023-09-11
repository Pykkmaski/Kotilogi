import Card from 'kotilogi-app/components/new/Gallery/Card/Card';

import ContentType = GalleryBase.ContentType;
import getEntryAsItem from './getEntryAsItem';
import getCardDestination from './getCardDestination';
import { throwErrorIfNull } from 'kotilogi-app/utils/throwErrorIfNull';
import getImageUrl from './getImageUrl';

export default function getCard(entry, contentType: GalleryBase.ContentType, key: number): JSX.Element | null{
    const item = getEntryAsItem(entry);
    const destination = getCardDestination(contentType, item.id);
    throwErrorIfNull(destination, 'Card destination cannot be null! contentType: (' + contentType + ')');
    
    if(contentType == ContentType.PROPERTY || contentType == ContentType.EVENT){
        const imageUrl = getImageUrl(contentType, item.id);
        return <Card item={item} destination={destination!} imageUrl={imageUrl} key={`gallery-card-${key}`}/>
    }
    else{
        return null;
    }
}