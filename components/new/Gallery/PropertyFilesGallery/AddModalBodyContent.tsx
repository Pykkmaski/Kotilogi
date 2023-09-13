"use client";

import useGalleryContext from "../GalleryBase/GalleryContext";
import {toast} from 'react-hot-toast';
import axios from "axios";
import getDbTableName from "../Util/getTableNameByContentType";
import Form from "kotilogi-app/components/Form";
import DescriptionFragment from "../ModalFragments/DescriptionFragment";
import ButtonsFragment from "../ModalFragments/ButtonsFragment";

type AddModalBodyContentProps = {
    property_id: Kotilogi.IdType,
}

export default function AddModalBodyContent(props: AddModalBodyContentProps){
    const {dispatch, contentType} = useGalleryContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try{

            const data = new FormData();
            const file = e.target.file.files[0];

            data.set('file', file);
            data.set('title', e.target.title.value);
            data.set('description', e.target.descrption.value);
            data.set('target_id', props.property_id);
            data.set('dbTableName', getDbTableName(contentType) as string);
            
            const postedData = await axios.post('/api/upload', data);
            
            dispatch({type: 'add_data', value: {
                data: postedData,
            }});

            toast.success('Tiedosto lisätty onnistuneesti!');
        }
        catch(err){
            console.log(err.message);
            toast.error('Tiedoston lisääminen epäonnistui!');
        }
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group>
                <input type="file" accept="image/jpeg" name="file"></input>
                <DescriptionFragment/>
                <ButtonsFragment/>
            </Form.Group>

        </Form>
    )
}