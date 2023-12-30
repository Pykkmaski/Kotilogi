'use client';

import Form from "kotilogi-app/components/Form/Form";
import ObjectModalWithFiles, { useObjectModalWithFilesContext } from "../../../Modals/ObjectModalWithFiles";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { addPropertyEvent } from "kotilogi-app/actions/propertyEvent/addPropertyEvent";
import { useRef } from "react";

function FormContent(){
    const {onChangeHandler} = useObjectModalWithFilesContext();

    return (
        <>
            <Form.Group>
                <label>Otsikko<span className="danger">*</span></label>
                <input name="title" required={true} placeholder="Kirjoita otsikko..." onChange={onChangeHandler}/>
            </Form.Group>

            <Form.Group>
                <label>Päivämäärä</label>
                <input type="date" name="time" onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group>
                <label>Kuvaus</label>
                <textarea name="description" placeholder="Kirjoita kuvaus..." onChange={onChangeHandler} spellCheck={false}/>
                <Form.SubLabel>Anna tapahtumalle vaihtoehtoinen kuvaus.</Form.SubLabel>
            </Form.Group>
        </>
    )
}

export default function AddModal(props: ModalProps){

    return (
        <ObjectModalWithFiles
            {...props}
            title="Lisää Tapahtuma"
            formContent={<FormContent/>}/>
    );
}