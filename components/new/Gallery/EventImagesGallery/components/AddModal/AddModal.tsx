'use client';

import Form from "kotilogi-app/components/Form";
import useGalleryContext from "../../../GalleryBase/GalleryContext";
import { serverAddData } from "kotilogi-app/actions/serverAddData";
import AddModalBase from "../../../Modals/AddModalBase";
import Modal from "kotilogi-app/components/Modals/Modal";
import style from './style.module.scss';
import Button from "kotilogi-app/components/Button/Button";
import { useState } from "react";

export default function AddModal(props: {show: boolean, onHide: () => void}){
    const {refId} = useGalleryContext();
    const [contentSection, setContentSection] = useState<'images' | 'files'>('images');
    
    const onSubmitHandler = async (e) => {
        const eventData = {
            title: e.target.title.value,
            description: e.target.description.value,
            time: new Date(e.target.date.value).getTime(),
            refId
        }

        return await serverAddData(eventData, 'propertyEvents');
    }

    const formId = 'eventEditForm';

    return (
        <Modal show={props.show} onHide={props.onHide} id="event-add-modal">
            <Modal.Header>Lisää Kuva</Modal.Header>
            <div className={style.modalBody}>
                <div className={style.descriptionSection}>
                    <Form id={formId} onSubmit={onSubmitHandler}>
                        <Form.Group>
                            <label>Otsikko</label>
                            <input name="title" required={true} placeholder="Kirjoita otsikko..."/>
                        </Form.Group>

                        <Form.Group>
                            <label>Kuvaus</label>
                            <textarea name="description" placeholder="Kirjoita kuvaus..."/>
                            <Form.SubLabel>Anna tapahtumalle vaihtoehtoinen kuvaus.</Form.SubLabel>
                        </Form.Group>
                    </Form>
                </div>

                <div className={style.contentSection}>
                    <div className={style.contentSectionHeader}>
                        <nav>
                            <div className={style.links}>
                                <span onClick={() => setContentSection('images')}>Kuvat</span>
                                <span onClick={() => setContentSection('files')}>Tiedostot</span>
                            </div>
                        </nav>
                    </div>

                    <div className={style.contentSectionBody}>
                        {
                            contentSection === 'images' ? <h2>Kuvat</h2>
                            :
                            <h2>Tiedostot</h2>
                        }
                    </div>
                </div>
            </div>
            <div className={style.modalFooter}>
                <Button
                    className="secondary"
                    desktopText="Peruuta"
                    onClick={() => props.onHide()}
                />

                <Button
                    className="primary"
                    desktopText="Lähetä"
                    type="submit"
                    form={formId}
                />
            </div>
        </Modal>
    );
}