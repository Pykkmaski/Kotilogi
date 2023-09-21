"use server";

import GalleryWithDelete from "../GalleryWithDelete/GalleryWithDelete";
import SelectAllButton from "../GalleryBase/Components/SelectAllButton";
import Error from "../GalleryBase/Error";
import ErrorImage from 'kotilogi-app/assets/house.png';
import DeselectAllButton from "../GalleryBase/Components/DeselectAllButton";

type PropertiesGalleryProps = {
    ownerId: string,
}

export default async function PropertiesGallery(props: PropertiesGalleryProps){
    const addModalOptions = {
        headerText: 'Lisää Uusi Talo',
    }   

    const deleteModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Poista valitut talot',
        bodyContent: <span>Haluatko varmasti poistaa valitsemasi talot?</span>
    }

    return (
        <GalleryWithDelete
            dbTableName="properties"
            refId={props.ownerId}
            title="Talot"
            subTitle={props.ownerId}
            addModalOptions={addModalOptions}
            deleteModalOptions={deleteModalOptions}
            headerButtons={[]}
            contentType='property'
            error={<Error title="Ei Taloja" message="Et ole vielä lisännyt taloja." imageUrl={ErrorImage}/>}
        />
    );
}