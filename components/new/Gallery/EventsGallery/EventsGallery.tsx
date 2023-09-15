import GalleryWithDelete from "../GalleryWithDelete/GalleryWithDelete";
import SelectAllButton from "../GalleryBase/Components/SelectAllButton";
import db from "kotilogi-app/dbconfig";
import Error from "../GalleryBase/Error";
import ErrorImage from 'kotilogi-app/assets/history.png';
import DeselectAllButton from "../GalleryBase/Components/DeselectAllButton";

type EventsGalleryProps = {
    property_id: string
    property_address: string,
}

export default async function EventsGallery(props: EventsGalleryProps){
    const {address} = await db('properties').where({id: props.property_id}).select('title').first();

    const addModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Lisää Tapahtuma',
    }

    const deleteModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Poista valitut tapahtumat',
        bodyContent: <span>Haluatko varmasti poistaa valitsemasi tapahtumat?</span>
    }

    return (
        <GalleryWithDelete
            dbTableName="property_events"
            refId={props.property_id}
            title="Tapahtumat"
            subTitle={address}
            headerButtons={[<SelectAllButton/>, <DeselectAllButton/>]}
            addModalOptions={addModalOptions}
            deleteModalOptions={deleteModalOptions}
            contentType='event'
            error={<Error title="Ei Tapahtumia" message="Et ole vielä lisännyt talolle tapahtumia" imageUrl={ErrorImage}/>}
        />
    )
}