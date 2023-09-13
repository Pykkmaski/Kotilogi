"use client";

import useGalleryContext from "../GalleryBase/GalleryContext";
import {toast} from 'react-hot-toast';
import getDbTableName from "../Util/getTableNameByContentType";
import Form from "kotilogi-app/components/Form";
import DescriptionFragment from "../ModalFragments/DescriptionFragment";
import ButtonsFragment from "../ModalFragments/ButtonsFragment";
import upload from "kotilogi-app/actions/upload";

type AddModalBodyContentProps = {
    property_id: Kotilogi.IdType,
}

export default function AddModalBodyContent(props: AddModalBodyContentProps){
    const {dispatch, contentType} = useGalleryContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try{
            dispatch({type: 'toggle_add_modal', value: false});
            const data = new FormData();
            const file = e.target.file.files[0];

            data.set('file', file);
            data.set('title', file.name);
            data.set('description', e.target.description.value);
            data.set('target_id', props.property_id);
            data.set('dbTableName', getDbTableName(contentType) as string);
            
            const postedData = await upload(data, 'property_images');
            if(!postedData) throw new Error(`Kuvaa ei voitu lisätä!`);

            dispatch({type: 'add_data', value: {
                data: postedData,
            }});

            toast.success('Kuva lisätty onnistuneesti!');
        }
        catch(err){
            console.log(err.message);
            toast.error('Kuvan lisääminen epäonnistui!');
        }
        finally{
            dispatch({type: 'toggle_loading', value: false});
        }
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <input type="file" accept="image/jpeg" name="file"></input>
            <DescriptionFragment/>
            <ButtonsFragment/>
        </Form>
    )
}