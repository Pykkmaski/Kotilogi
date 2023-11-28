'use client';

import { serverAddData } from "kotilogi-app/actions/serverAddData";
import Form from "kotilogi-app/components/Form";
import useGalleryContext from "../../../GalleryBase/GalleryContext";
import AddModalBase from "../../../Modals/AddModalBase";

export default function AddModal(props: {
    show: boolean, 
    onHide: () => void
}){
    const {refId, dispatch} = useGalleryContext();

    const onSubmitHandler = async (e) => {
        const propertyData = {
            title: e.target.title.value,
            description: e.target.description.value,
            refId,
        }
        
       return await serverAddData(propertyData, 'properties');
      
    }

    return (
        <AddModalBase 
            show={props.show} 
            onHide={props.onHide} 
            id="properties-add-modal" 
            headerText="Lisää Talo" 
            onSubmitHandler={onSubmitHandler}
            successMessage="Talon lisääminen onnistui!"
            errorMessage="Talon lisääminen epäonnistui!"
        >
                <Form.Group>
                    <label>Osoite</label>
                    <input name="title" required />
                </Form.Group>

                <Form.Group>
                    <label>Kuvaus</label>
                    <textarea name="description"/>
                </Form.Group>
        </AddModalBase>
    );
}