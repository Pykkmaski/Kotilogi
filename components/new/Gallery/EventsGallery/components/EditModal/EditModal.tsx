'use client';

import Form from "kotilogi-app/components/Form/Form";
import useGalleryContext from "../../../GalleryBase/GalleryContext";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import Button from "kotilogi-app/components/Button/Button";
import { useRef, useState } from "react";
import ObjectModalBase from "../../../Modals/ObjectModalBase";
import toast from "react-hot-toast";
import GalleryBase from "../../../GalleryBase/GalleryBase";
import AddFilesModal from "../../../Modals/AddFilesModal";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";
import ImageGallery from "./components/ImageGallery";
import FileGallery from "./components/FileGallery";


export default function EditModal(props: {
    show: boolean, 
    onHide: () => void,
    item: any,
}){
    const {props: {tableName, query}, dispatch}        = useGalleryContext();
    const [loading, setLoading]                        = useState(false);
    const [currentSection, setCurrentSection]          = useState<'images' | 'files'>('images');
    const data                                         = useRef(props.item);

    if(!data.current) return;

    const onChangeHandler = (e) => {
        data.current = {
            ...data.current,
            [e.target.name] : e.target.value,
            refId: query.refId,
        };
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const updateResult = await serverUpdateDataById(data.current, data.current.id, tableName);
        if(!updateResult){
            toast.error('Tapahtuman päivitys epäonnistui!');
        }
        else{
            dispatch({
                type: 'update_item',
                value: {...updateResult},
            });

            toast.success('Tapahtuman päivitys onnistui!');
            props.onHide();
        }

        setLoading(false);
    }

    const modalId = `event-edit-modal-${props.item.id}`;
    const formId = `form-${modalId}`;
    if(!data.current) return;
    
    const formContent = (
        <>
            <Form.Group>
                <label>Otsikko<span className="danger">*</span></label>
                <input 
                    name="title" 
                    required={true} 
                    placeholder="Kirjoita otsikko..." 
                    defaultValue={data.current.title} 
                    onChange={onChangeHandler}
                />
            </Form.Group>

            <Form.Group>
                <label>Päivämäärä</label>
                <input 
                    type="date" 
                    name="time" 
                    defaultValue={data.current.time} 
                    onChange={onChangeHandler}
                />
            </Form.Group>

            <Form.Group>
                <label>Kuvaus</label>
                <textarea 
                    name="description" 
                    placeholder="Kirjoita kuvaus..." 
                    defaultValue={data.current.description} 
                    onChange={onChangeHandler}
                />
                <Form.SubLabel>Anna tapahtumalle vaihtoehtoinen kuvaus.</Form.SubLabel>
            </Form.Group>
        </>
    );

    const bodyContent = (
        <>
            {
                currentSection === 'images' && props.show ?
                    <ImageGallery item={data.current}/>
                :
                currentSection === 'files' && props.show ?
                    <FileGallery item={data.current}/>
                :
                null
            }
        </>
    );

    const headerContent = (
        <nav className="links">
            <span onClick={() => setCurrentSection('images')}>Kuvat</span>
            <span onClick={() => setCurrentSection('files')}>Tiedostot</span>
        </nav>
    );

    const footerContent = (
        <>
            <Button
                className="secondary"
                desktopText="Peruuta"
                onClick={() => props.onHide()}
                disabled={loading}
            />

            <Button
                className="primary"
                desktopText="Tallenna"
                type="submit"
                form={formId}
                loading={loading}
                disabled={loading}
            />
        </>
    );


    return (
        <ObjectModalBase 
            title="Muokkaa Tapahtumaa"
            show={props.show} 
            onHide={props.onHide} 
            onSubmitHandler={onSubmitHandler}
            id={modalId}
            formContent={formContent}
            bodyContent={bodyContent}
            headerContent={headerContent}
            footerContent={footerContent}
        />
    );
}