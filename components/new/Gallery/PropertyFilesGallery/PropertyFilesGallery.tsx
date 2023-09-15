import db from "kotilogi-app/dbconfig";
import BaseFileGallery from "../BaseFileGallery/BaseFileGallery";
import Error from "../GalleryBase/Error";
import ErrorImage from 'kotilogi-app/assets/copy.png'
import GalleryWithDelete from "../GalleryWithDelete/GalleryWithDelete";
import Form from "kotilogi-app/components/Form";

type PropertyImagesGalleryProps = {
    property_id: Kotilogi.IdType,
}

export default async function PropertyFilesGallery(props: PropertyImagesGalleryProps){
    const {address} = await db('properties').where({id: props.property_id}).select('title').first();
    const data = await db('property_files').where({ref_id: props.property_id});

    const addModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Lisää Tiedosto',
        bodyContent: (
            <Form.Group>
                <label>Tiedosto</label>
                <input type="file" accept="application/pdf" name="file"/>
            </Form.Group>
        )
    }

    const deleteModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Poista tiedostoja',
        bodyContent: <span>Haluatko varmasti poistaa valitut tiedostot?</span>
    }

    return (
        <GalleryWithDelete
            dbTableName="property_files"
            refId={props.property_id}
            
            contentType="property_file"
            title="Tiedostot"
            subTitle={address}
            addModalOptions={addModalOptions}
            deleteModalOptions={deleteModalOptions}
            headerButtons={[]}
            error={<Error title="Ei Tiedostoja" message="Et ole vielä lisännyt talolle tiedostoja" imageUrl={ErrorImage}/>}
        />
    )
}