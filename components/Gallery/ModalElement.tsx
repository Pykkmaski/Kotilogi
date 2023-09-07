import { useState } from "react";
import Form from "../Form";
import Modal from "../Modals/Modal";
import { FormField, ModalOptions } from "./Types";
import { useGallery } from "kotilogi-app/contexts/GalleryProvider";

export default function ModalElement<T>({modalOptions, show, onHide, action, key}){
    const {options} = useGallery();
    const [data, setData] = useState<T & {id: string, file: any}>({
        ...options.defaultData,
    });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(data.file.files[0]);
        action(data);
        onHide(); //Hide the modal when finished
    }

    const onChangeHandler = (e) => {
       setData({
        ...data,
        [e.target.name] : e.target.value,
       });
    }

    const spellCheckSetting = false;
    const form: JSX.Element | null = modalOptions.fields ? (
        <Form onSubmit={onSubmitHandler}>
            {
                modalOptions.fields?.map((field: FormField, index: number) => {
                    return(
                        <Form.Group key={index}>
                            <label htmlFor={field.name}>{field.label}</label>
                            {
                                field.type !== 'textarea' ? 
                                <input name={field.name} type={field.type} required={field.required} onChange={onChangeHandler} spellCheck={spellCheckSetting} accept={field.accept}></input>
                                :
                                <textarea name={field.name} required={field.required} onChange={onChangeHandler} spellCheck={spellCheckSetting}></textarea>
                            }
                            
                            <Form.SubLabel>{field.sublabel}</Form.SubLabel>
                        </Form.Group>
                    )
                })
            }
            <Form.ButtonGroup>
                <button type="button" className="secondary" onClick={() => onHide()}>Peruuta</button>
                <button type="submit" className="primary">Lähetä</button>
            </Form.ButtonGroup>
        </Form>
    )
    :
    <></>;

    const footer: JSX.Element | null = !form ? (
        <Modal.Footer>
            <button type="button" className="secondary" onClick={() => onHide()}>Peruuta</button>
            <button type="button" className="primary" onClick={() => action(data)}>OK</button>
        </Modal.Footer>
    )
    : 
    <></>;

    return (
        <Modal show={show} onHide={onHide} key={key}>
            <Modal.Header>{modalOptions.headerText}</Modal.Header>
            <Modal.Body>
                {modalOptions.bodyText}
                {form}
            </Modal.Body>
            {footer}
        </Modal>
    )     
}