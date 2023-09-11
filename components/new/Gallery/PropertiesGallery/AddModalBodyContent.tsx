"use client";

import Form from "kotilogi-app/components/Form";
import useGalleryContext from "../GalleryBase/GalleryContext";
import DescriptionFragment from "../ModalFragments/DescriptionFragment";
import ButtonsFragment from "../ModalFragments/ButtonsFragment";
import generateId from "kotilogi-app/utils/generateId";
import { serverAddData } from "kotilogi-app/actions/serverAddData";
import {toast} from 'react-hot-toast';

type AddModalBodyContentProps = {
    ownerId: string,
}

export default function AddModalBodyContent(props: AddModalBodyContentProps){
    const {dispatch} = useGalleryContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try{
            const newProperty = {
                owner: props.ownerId,
                address: e.target.address.value,
                description: e.target.description.value,
                id: await generateId(),
            } as Kotilogi.PropertyType;
            
            const result = await serverAddData(newProperty, 'properties');
            if(result === null) throw new Error('Failed to save new property!');
            
            dispatch({type: 'add_data', value: {
                data: newProperty,
                dbTableName: 'properties',
            }});

            toast.success('Talo lisätty onnistuneesti!');
        }
        catch(err){
            console.log(err.message);
            toast.error('Talon lisääminen epäonnistui!');
        }
        
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group>
                <label>Osoite</label>
                <input type="text" name="address" required></input>
            </Form.Group>

            <DescriptionFragment/>
            <ButtonsFragment/>
        </Form>
    );
}