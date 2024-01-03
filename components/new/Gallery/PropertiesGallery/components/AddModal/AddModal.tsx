'use client';

import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import ObjectModalWithFiles, { useObjectModalWithFilesContext } from "../../../Modals/ObjectModalWithFiles";
import Form from "kotilogi-app/components/Form/Form";
import { Label } from "kotilogi-app/components/Label/Label";

function FormContent(){
    const {onChangeHandler} = useObjectModalWithFilesContext();
    return (
        <>
            <Form.Group>
                <Label required={true}>Osoite</Label>
                <input name="title" required={true} placeholder="Kirjoita talon osoite..." onChange={onChangeHandler}/>
                <Form.SubLabel>Osoitteen tulee olla olemassa oleva Suomen katuosoite.</Form.SubLabel>
            </Form.Group>

            <Form.Group>
                <Label required={true}>Postinumero</Label>
                <input name="zipCode" required={true} placeholder="Kirjoita talon postinumero..." onChange={onChangeHandler}/>
                <Form.SubLabel>Postinumeron tulee olla pätevä Suomen postinumero.</Form.SubLabel>
            </Form.Group>

            <Form.Group>
                <Label required={false}>Kuvaus</Label>
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