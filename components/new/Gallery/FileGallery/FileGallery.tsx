import { serverGetData } from "kotilogi-app/actions/serverGetData";
import GalleryWithDelete from "../GalleryWithDelete/GalleryWithDelete";
import { throwErrorIfNull } from "kotilogi-app/utils/throwErrorIfNull";
import getData from "./getData";
import AddModalBodyContent from "./AddModalBodyContent";

type FileGalleryProps = {
    contentType: FileGallery.ContentType,
    dbTableName: 'property_files' | 'event_files',
    target_id: string,
    addModal: GalleryBase.AddModalOptions,
    title: string,
    subtitle: string,
}

export default async function FileGallery(props: FileGalleryProps){
    const data = await getData(props.contentType, props.dbTableName, props.target_id);
    throwErrorIfNull(data, 'Failed to load files!');

    const addModal: GalleryBase.AddModalOptions = {
        headerText: 'Lisää Tiedosto',
        bodyContent: <AddModalBodyContent contentType={props.contentType}/>
    }

    const deleteModalOptions: GalleryWithDelete.DeleteModalOptions = {
        headerText: 'Vahvista poisto',
        bodyText: 'Oletko varma että haluat poistaa valitsemasi kohteet?',
    }

    return (
        <GalleryWithDelete
            data={data}
            title={props.title}
            subtitle={props.subtitle}
            headerButtons={[]}
            addModalOptions={addModal}
            deleteButtonText="Poista Valitut"
            deleteModalOptions={deleteModalOptions}
        />
    )
}