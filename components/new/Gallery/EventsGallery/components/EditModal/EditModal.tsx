'use client';

import Form from "kotilogi-app/components/Form";
import useGalleryContext from "../../../GalleryBase/GalleryContext";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import Button from "kotilogi-app/components/Button/Button";
import { useState } from "react";
import ObjectModalBase from "../../../Modals/ObjectModalBase";
import toast from "react-hot-toast";
import GalleryBase from "../../../GalleryBase/GalleryBase";
import AddFilesModal from "../../../Modals/AddFilesModal";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";
import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";

function AddImagesModal(props: ModalProps & {item: any}): JSX.Element{
    return (
        <AddFilesModal 
            show={props.show} 
            onHide={props.onHide}
            title="Lisää Kuvia"
            fileType="image/jpeg"
            id="add-event-images-modal"
            item={props.item}
        />
    )
}

function AddPdfsModal(props: ModalProps & {item: any}): JSX.Element{

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log('Uploading files');
    }

    return (
        <AddFilesModal
            show={props.show}
            onHide={props.onHide}
            title="Lataa Tiedostoja"
            fileType="application/pdf"
            id="add-event-files-modal"
            item={props.item}
        />
    )
}

export default function EditModal(props: {
    show: boolean, 
    onHide: () => void,
    item: any,
}){
    const {props: {tableName, query}, dispatch}        = useGalleryContext();
    const [loading, setLoading]                        = useState(false);
    const [currentSection, setCurrentSection]          = useState<'images' | 'files'>('images');
    const [currentData, setCurrentData]                = useState(props.item);

    if(!currentData) return;

    const onChangeHandler = (e) => {
        setCurrentData(prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value,
                refId: query.refId,
            }
        });
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const updateResult = await serverUpdateDataById(currentData, currentData.id, tableName);
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
    const event = currentData;

    if(!event) return;
    
    const formContent = (
        <>
            <Form.Group>
                <label>Otsikko<span className="danger">*</span></label>
                <input 
                    name="title" 
                    required={true} 
                    placeholder="Kirjoita otsikko..." 
                    defaultValue={event.title} 
                    onChange={onChangeHandler}
                />
            </Form.Group>

            <Form.Group>
                <label>Päivämäärä</label>
                <input 
                    type="date" 
                    name="time" 
                    defaultValue={event.time} 
                    onChange={onChangeHandler}
                />
            </Form.Group>

            <Form.Group>
                <label>Kuvaus</label>
                <textarea 
                    name="description" 
                    placeholder="Kirjoita kuvaus..." 
                    defaultValue={event.description} 
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
                <GalleryBase 
                    title="Kuvat"
                    query={{
                        refId: event.id,
                        mimeType: 'image/jpeg',
                    }}
                    tableName="eventFiles"
                    contentType="image"
                    AddModal={(HOCProps: ModalProps) => {
                        return (
                            <AddImagesModal
                                {...HOCProps}
                                item={props.item}
                            />
                        )
                        
                    }}
                    
                />
                :
                currentSection === 'files' && props.show ?
                <GalleryBase
                    title="Tiedostot"
                    query={{
                        refId: event.id,
                        mimeType: 'application/pdf',
                    }}
                    tableName="eventFiles"
                    contentType="file"
                    AddModal={(HOCProps: ModalProps & {item: any}) => {
                        return (
                            <AddPdfsModal
                                {...HOCProps}
                                item={props.item}
                            />
                        )
                    }}
                />
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
                desktopText="Päivitä"
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