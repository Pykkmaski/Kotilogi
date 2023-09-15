import db from "kotilogi-app/dbconfig";
import Error from 'kotilogi-app/components/new/Gallery/GalleryBase/Error';
import ErrorImage from 'kotilogi-app/assets/image.png';
import Form from "kotilogi-app/components/Form";
import GalleryWithDelete from "../GalleryWithDelete/GalleryWithDelete";

type PropertyImagesGalleryProps = {
    property_id: Kotilogi.IdType,
}

export default async function PorpertyImagesGallery(props: PropertyImagesGalleryProps){
    const {address} = await db('properties').where({id: props.property_id}).select('title').first();

    const addModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Lisää kyykky',
        bodyContent: (
            <Form.Group>
                <label>Kuva</label>
                <input type="file" name="file" accept="image/jpeg"/>
            </Form.Group>
        )
    }

    const deleteModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Poista kuvia',
        bodyContent: <span>Haluatko varmasti poistaa valitut kuvat?</span>,
    }

    return (
        <GalleryWithDelete
            dbTableName="property_images"
            refId={props.property_id}
            title='Kuvat'
            subTitle={address}
            headerButtons={[]}
            addModalOptions={addModalOptions}
            deleteModalOptions={deleteModalOptions}
            contentType="property_image"
            error={<Error title="Ei Kuvia" message="Et ole vielä lisännyt talolle kuvia." imageUrl={ErrorImage}/>}
        />
    )
}