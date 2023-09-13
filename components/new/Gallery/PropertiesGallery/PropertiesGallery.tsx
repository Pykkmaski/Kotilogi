import { serverGetData } from "kotilogi-app/actions/serverGetData";
import BodyContent from './AddModalBodyContent';
import GalleryWithDelete from "../GalleryWithDelete/GalleryWithDelete";
import RemoveSelectionsButton from "../GalleryBase/RemoveSelectionsButton";
import SelectAllButton from "../GalleryBase/SelectAllButton";
import Error from "../GalleryBase/Error";
import ErrorImage from 'kotilogi-app/assets/house.png';

type PropertiesGalleryProps = {
    ownerId: string,
}

export default async function PropertiesGallery(props: PropertiesGalleryProps){
    const properties = await serverGetData('properties', {owner: props.ownerId}, false);
    const addModalOptions = {
        headerText: 'Lisää Uusi Talo',
        bodyContent: <BodyContent ownerId={props.ownerId}/>
    }   

    const deleteModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Poista valitut talot',
        bodyContent: <span>Haluatko varmasti poistaa valitsemasi talot?</span>
    }

    return (
        <GalleryWithDelete
            data={properties}
            title="Talot"
            subTitle={props.ownerId}
            addModalOptions={addModalOptions}
            deleteModalOptions={deleteModalOptions}
            headerButtons={[<RemoveSelectionsButton/>, <SelectAllButton/>]}
            contentType='property'
            error={<Error title="Ei Tiedostoja" message="Et ole vielä lisännyt talolle tiedostoja" imageUrl={ErrorImage}/>}
        />
    );
}