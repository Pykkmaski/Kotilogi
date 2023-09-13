"use client";

import useGalleryContext from "../GalleryBase/GalleryContext";
import generateId from "kotilogi-app/utils/generateId";
import { serverAddData } from "kotilogi-app/actions/serverAddData";
import {toast} from 'react-hot-toast';
import BaseAddModalContent from "../GalleryBase/AddModalBodyContent";

type AddModalBodyContentProps = {
    property_id: string,
}

export default function AddModalBodyContent(props: AddModalBodyContentProps){
    const {dispatch} = useGalleryContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try{
            const newEvent = {
                property_id: props.property_id,
                name: e.target.name.value,
                description: e.target.description.value,
                date: Date.now(),
            } as Kotilogi.EventType;
            
            const result = await serverAddData(newEvent, 'property_events');
            if(result === null) throw new Error('Failed to save new event!');
            
            dispatch({type: 'add_data', value: {
                data: result,
            }});

            toast.success('Tapahtuma lisätty onnistuneesti!');
        }
        catch(err){
            console.log(err.message);
            toast.error('Tapahtuman lisääminen epäonnistui!');
        }
    }

    return <BaseAddModalContent titleInputLabel="Nimi" titleInputName="name" onSubmitHandler={onSubmitHandler}/>
}