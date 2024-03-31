import db from "kotilogi-app/dbconfig";
import { Content } from "./page.component";
import { ImagesGallery } from "@/components/new/Gallery/GalleryBase/ImagesGallery";
import { PropertyImageListItem } from "@/components/ListItem/ImageListItem";

async function getImages(propertyId){
    return await db('propertyFiles').where({refId: propertyId, mimeType: 'image/jpeg'});
}

export default async function FilesPage({params}){
    const images = await getImages(params.property_id);

    return (
        <main>
            <ImagesGallery tablename="propertyFiles" images={images} refId={params.property_id} ImageComponent={PropertyImageListItem}/>
        </main>
    );
}