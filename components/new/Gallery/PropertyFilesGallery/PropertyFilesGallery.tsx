import db from "kotilogi-app/dbconfig";
import BodyContent from './AddModalBodyContent';
import BaseFileGallery from "../BaseFileGallery/BaseFileGallery";
import Error from "../GalleryBase/Error";
import ErrorImage from 'kotilogi-app/assets/copy.png'

type PropertyImagesGalleryProps = {
    property_id: Kotilogi.IdType,
}

export default async function PropertyFilesGallery(props: PropertyImagesGalleryProps){
    const {address} = await db('properties').where({id: props.property_id}).select('address').first();
    const data = await db('property_files').where({property_id: props.property_id});

    const addModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Lisää Tiedosto',
        bodyContent: <BodyContent property_id={props.property_id}/>
    }

    const deleteModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Poista tiedostoja',
        bodyContent: <span>Haluatko varmasti poistaa valitut tiedostot?</span>
    }

    return (
        <BaseFileGallery
            contentType="property_file"
            title="Tiedostot"
            subTitle={address}
            data={data}
            addModalOptions={addModalOptions}
            deleteModalOptions={deleteModalOptions}
            headerButtons={[]}
            error={<Error title="Ei Tiedostoja" message="Et ole vielä lisännyt talolle tiedostoja" imageUrl={ErrorImage}/>}
        />
    )
}