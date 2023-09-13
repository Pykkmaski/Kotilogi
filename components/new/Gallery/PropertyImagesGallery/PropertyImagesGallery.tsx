import db from "kotilogi-app/dbconfig";
import RemoveSelectionsButton from "../GalleryBase/RemoveSelectionsButton";
import SelectAllButton from "../GalleryBase/SelectAllButton";
import GalleryWithDelete from "../GalleryWithDelete/GalleryWithDelete";
import BodyContent from './AddModalBodyContent';
import Error from 'kotilogi-app/components/new/Gallery/GalleryBase/Error';
import ErrorImage from 'kotilogi-app/assets/image.png';

type PropertyImagesGalleryProps = {
    property_id: Kotilogi.IdType,
}

export default async function PorpertyImagesGallery(props: PropertyImagesGalleryProps){
    const {address} = await db('properties').where({id: props.property_id}).select('address').first();
    const data = await db('property_images').where({property_id: props.property_id});

    const addModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Lisää Kuva',
        bodyContent: <BodyContent property_id={props.property_id}/>
    }

    const deleteModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Poista kuvia',
        bodyContent: <span>Haluatko varmasti poistaa valitut kuvat?</span>,
    }

    const headerButtons = [
        <SelectAllButton/>,
        <RemoveSelectionsButton/>
    ];

    return (
        <GalleryWithDelete
            data={data}
            title='Kuvat'
            subTitle={address}
            headerButtons={headerButtons}
            addModalOptions={addModalOptions}
            deleteModalOptions={deleteModalOptions}
            contentType="property_image"
            error={<Error title="Ei Kuvia" message="Et ole vielä lisännyt talolle kuvia." imageUrl={ErrorImage}/>}
        />
    )
}