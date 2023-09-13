import { serverGetData } from "kotilogi-app/actions/serverGetData";
import GalleryWithDelete from "../GalleryWithDelete/GalleryWithDelete";
import { throwErrorIfNull } from "kotilogi-app/utils/throwErrorIfNull";
import BodyContent from './AddModalBodyContent';
import SelectAllButton from "../GalleryBase/SelectAllButton";
import RemoveSelectionsButton from "../GalleryBase/RemoveSelectionsButton";
import db from "kotilogi-app/dbconfig";

type EventsGalleryProps = {
    property_id: string
    property_address: string,
}

export default async function EventsGallery(props: EventsGalleryProps){
    const {address} = await db('properties').where({id: props.property_id}).select('address').first();
    const events = await serverGetData('property_events', {property_id: props.property_id}, false);
    throwErrorIfNull(events, 'Tapahtumien lataaminen epäonnistui!');

    const addModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Lisää Tapahtuma',
        bodyContent: <BodyContent property_id={props.property_id}/>
    }

    const deleteModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Poista valitut tapahtumat',
        bodyContent: <span>Haluatko varmasti poistaa valitsemasi tapahtumat?</span>
    }

    return (
        <GalleryWithDelete
            data={events}
            title="Tapahtumat"
            subTitle={address}
            headerButtons={[<SelectAllButton/>, <RemoveSelectionsButton/>]}
            addModalOptions={addModalOptions}
            deleteModalOptions={deleteModalOptions}
            contentType='event'
        />
    )
}