import { ItemType } from "kotilogi-app/components/Cards/ItemCard";
import getImageUrl from "./getImageUrl";

type ParamTypes = Kotilogi.PropertyType | Kotilogi.EventType | Kotilogi.PropertyFileType | Kotilogi.EventFileType;

function getTitle(entry: ParamTypes): string{
    if('address' in entry){
        return entry.address;
    }
    else if('name' in entry){
        return entry.name;
    }
    else{
        return entry.title;
    }
}

export default function getEntryAsItem(contentType: GalleryBase.ContentType, entry: ParamTypes): ItemType{
    const title = getTitle(entry);
    const imageUrl = getImageUrl(entry, contentType);

    return {
        title,
        description: entry.description,
        id: entry.id,
        imageUrl,
    } as ItemType;
}