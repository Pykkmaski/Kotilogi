"use client";

import generateId from "kotilogi-app/utils/generateId";
import { serverAddData } from "kotilogi-app/actions/serverAddData";
import {toast} from 'react-hot-toast';
import useGalleryContext from "../GalleryContext";
import BaseAddModalBody from "./BaseAddModalBody";

export default function AddModal(){
    const {dispatch, dbTableName, refId} = useGalleryContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try{
            const newData = {
                ref_id: refId,
                title: e.target.title.value,
                description: e.target.description.value,
                id: await generateId(),
            }
            
            const result = await serverAddData(newData, dbTableName);
            if(result === null) throw new Error('Failed to save new property!');
            
            dispatch({type: 'add_data', value: result});

            toast.success('Kohde lisätty onnistuneesti!');
        }
        catch(err){
            console.log(err.message);
            toast.error('Kohteen lisääminen epäonnistui!');
        }
    }

    const titleInputLabel = dbTableName === 'properties' ? 'Osoite' : 'Otsikko';
    return <BaseAddModalBody titleInputLabel={titleInputLabel} onSubmitHandler={onSubmitHandler}/>
}