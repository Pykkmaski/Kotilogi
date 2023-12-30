'use client';

import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import ObjectModalWithFiles, { useObjectModalWithFilesContext } from "../../../Modals/ObjectModalWithFiles";
import Form from "kotilogi-app/components/Form/Form";
import Link from "next/link";

function FormContent(){
    const {onChangeHandler} = useObjectModalWithFilesContext();
    return (
        <>
            <Form.Group>
                <label>Osoite<span className='danger'>*</span></label>
                <input name="title" required={true} placeholder="Kirjoita talon osoite..." onChange={onChangeHandler}/>
                <Form.SubLabel>Osoitteen tulee olla olemassa oleva Suomen katuosoite.</Form.SubLabel>
            </Form.Group>

            <Form.Group>
                <label>Postinumero<span className="danger">*</span></label>
                <input name="zipCode" required={true} placeholder="Kirjoita talon postinumero..." onChange={onChangeHandler}/>
                <Form.SubLabel>Postinumeron tulee olla pätevä Suomen postinumero.</Form.SubLabel>
            </Form.Group>

            <Form.Group>
                <label>Kuvaus</label>
                <textarea name="description" placeholder="Kirjoita talon kuvaus..." maxLength={200} onChange={onChangeHandler}/>
                <Form.SubLabel>Kuvaus on vaihtoehtoinen.</Form.SubLabel>
            </Form.Group>
        </>
    );
}

export default function AddModal(props: ModalProps){
    return (
        <ObjectModalWithFiles
            {...props}
            title="Lisää Talo"
            formContent={<FormContent/>}
        />
    );
}