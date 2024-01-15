import { PageWithData } from "kotilogi-app/components/Experimental/Page/PageWithData/PageWithData";
import { EventFileListItem } from "kotilogi-app/components/ListItem/ListItem";
import FileGallery from "kotilogi-app/components/new/Gallery/FileGallery/FileGallery";

export default async function Page({params}){
    return (
        <FileGallery
            tableName={"eventFiles"} refId={params.event_id}/>
    );
}