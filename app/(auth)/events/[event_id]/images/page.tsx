import { PageWithData } from "kotilogi-app/components/Experimental/Page/PageWithData/PageWithData";
import { EventImageItem } from "kotilogi-app/components/ListItem/ListItem";

export default async function Page({params}){
    return (
        <PageWithData
            title="Kuvat"
            tablename="eventFiles"
            query={{
                refId: params.event_id,
                mimeType: 'image/jpeg',
            }}
            display="card"
            itemComponent={EventImageItem}
        />
    )
}