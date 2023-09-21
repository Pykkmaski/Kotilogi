import db from "kotilogi-app/dbconfig"
import GalleryWithDelete from "../GalleryWithDelete/GalleryWithDelete"
import Form from "kotilogi-app/components/Form"
import Error from 'kotilogi-app/components/new/Gallery/GalleryBase/Error';
import ErrorImage from 'kotilogi-app/assets/image.png';

type Props = {
    eventId: Kotilogi.IdType,
}

export default async function EventImagesGallery(props: Props){

    const addModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Lisää Kuva',
        bodyContent: (
            <Form.Group>
                <label>Kuva</label>
                <input type="file" name="file" accept="image/jpeg" required></input>
            </Form.Group>
        )
    }

    const deleteModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Poista Valitut Kuvat',
        bodyContent: <span>Haluatko varmasti poistaa valitsemasi kuvat?</span>
    }

    const error = (
        <Error
            title="Ei Kuvia"
            message="Et ole vielä lisännyt tapahtumalle kuvia"
            imageUrl={ErrorImage}
        />
    );

    return (
        <GalleryWithDelete
            contentType="event_image"
            title="Kuvat"
            subTitle=""
            dbTableName="eventImages"
            refId={props.eventId}
            addModalOptions={addModalOptions}
            deleteModalOptions={deleteModalOptions}
            headerButtons={[]}
            error={error}
        />
    )
}