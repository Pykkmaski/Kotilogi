import GalleryWithDelete from "../GalleryWithDelete/GalleryWithDelete";
import SelectAllButton from "../GalleryBase/Components/SelectAllButton";
import db from "kotilogi-app/dbconfig";
import Error from "../GalleryBase/Error";
import ErrorImage from 'kotilogi-app/assets/history.png';
import Form from "kotilogi-app/components/Form";

type EventsGalleryProps = {
    propertyId: string
    propertyAddress: string,
}

export default async function EventsGallery(props: EventsGalleryProps){
    const {address} = await db('properties').where({id: props.propertyId}).select('title').first();

    const addModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Lisää Tapahtuma',
        bodyContent: (
            <Form.Group>
                <label>Päivämäärä</label>
                <input type="date" name="time"/>
            </Form.Group>
        )
    }

    const deleteModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Poista valitut tapahtumat',
        bodyContent: <span>Haluatko varmasti poistaa valitsemasi tapahtumat?</span>
    }

    return (
        <GalleryWithDelete
            dbTableName="propertyEvents"
            refId={props.propertyId}
            title="Tapahtumat"
            subTitle={address}
            headerButtons={[]}
            addModalOptions={addModalOptions}
            deleteModalOptions={deleteModalOptions}
            contentType='event'
            error={<Error title="Ei Tapahtumia" message="Et ole vielä lisännyt talolle tapahtumia." imageUrl={ErrorImage}/>}
        />
    )
}