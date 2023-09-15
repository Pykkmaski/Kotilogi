"use client";

import Form from "kotilogi-app/components/Form";
import DescriptionFragment from "../../ModalFragments/DescriptionFragment";
import ButtonsFragment from "../../ModalFragments/ButtonsFragment";
import upload from "kotilogi-app/actions/upload";
import useGalleryContext from "../../GalleryBase/GalleryContext";
import getTableNameByContentType from "../../Util/getTableNameByContentType";
import getFileTypeByContentType from "../../Util/getFileTypeByContentType";
import {toast} from "react-hot-toast";

export default function AddForm(){
    const {dispatch, contentType, dbTableName, targetId} = useGalleryContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try{
            dispatch({
                type: 'toggle_loading',
                value: true,
            });
    
            dispatch({
                type: 'toggle_add_modal',
                value: false,
            });

            const data = new FormData();
            const file = e.target.file.files[0];

            data.set('file', file);
            data.set('title', file.name);
            data.set('description', e.target.description.value);
            data.set('dbTableName', dbTableName);
            data.set('target_id', targetId);

            const uploadedData = await upload(data, dbTableName);

            dispatch({
                type: 'add_data',
                value: uploadedData,
            });

            toast.success('Tiedosto lisätty onnistuneesti');
        }
        catch(err){
            console.log(err.message);
            toast.error('Tiedoston lisäys epäonnistui!');
        }
        finally{
            dispatch({
                type: 'toggle_loading',
                value: false,
            });
        }
    }

    const accept = getFileTypeByContentType(contentType);
    if(!accept) throw new Error(`AddForm: Received unsupported content type (${contentType})! Cannot determine accepted file type.`);

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group>
                <label>Tiedosto</label>
                <input type="file" accept={accept} name="file" required={true}></input>
            </Form.Group>

            <DescriptionFragment/>
            <ButtonsFragment/>
        </Form>
    );
}