import { serverGetData } from "kotilogi-app/actions/serverGetData";
import AddModalBodyContent from "./AddModalBodyContent";
import GalleryWithDelete from "../GalleryWithDelete/GalleryWithDelete";
import ContentType = GalleryBase.ContentType;

type PropertiesGalleryProps = {
    ownerId: string,
}

export default async function PropertiesGallery(props: PropertiesGalleryProps){
    const properties = await serverGetData('properties', {owner: props.ownerId}, false);

    const addModalOptions = {
        headerText: 'Lisää Uusi Talo',
        bodyContent: <AddModalBodyContent ownerId={props.ownerId}/>
    }   

    const deleteModalOptions: GalleryWithDelete.DeleteModalOptions = {
        headerText: 'Poista valitut talot',
        bodyText: 'Haluatko varmasti poistaa valitsemasi talot?'
    }

    return (
        <GalleryWithDelete
            data={properties}
            title="Talot"
            subTitle={props.ownerId}
            addModalOptions={addModalOptions}
            deleteModalOptions={deleteModalOptions}
            headerButtons={[]}
            deleteButtonText="Poista Valinnat"
            contentType={ContentType.PROPERTY}
        />
    );
}