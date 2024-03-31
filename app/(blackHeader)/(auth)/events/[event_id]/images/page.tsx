import db from "kotilogi-app/dbconfig";
import { EventImageListItem } from "@/components/ListItem/ImageListItem";
import { ImagesGallery } from "@/components/new/Gallery/GalleryBase/ImagesGallery";

export default async function Page({params}){
    const images = await db('eventFiles').where({refId: params.event_id, mimeType: 'image/jpeg'});
    
    return <ImagesGallery tablename="eventFiles" refId={params.event_id} images={images} ImageComponent={EventImageListItem}/>
}