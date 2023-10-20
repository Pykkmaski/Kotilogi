"use client";

import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";
import Button from "kotilogi-app/components/Button/Button";
import Form from "kotilogi-app/components/Form";
import Modal from "kotilogi-app/components/Modals/Modal";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import style from './page.module.scss';
import InfoContainer from "./_Components/InfoContainer/InfoContainer";

type Props = {
    event: Kotilogi.EventType,
}

export default function EventInfo(props: Props){
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try{
            setLoading(true);
            const time = e.target.time.value ? new Date(e.target.time.value).getTime() : undefined;
            const newData = {
                title: e.target.title.value,
                description: e.target.description.value,
                time
            }

            const result = await serverUpdateDataById(newData, props.event.id, 'propertyEvents');
            if(!result) throw new Error('Failed to update event!');
            serverRevalidatePath('/auth/events/[event_id]/info');
            toast.success('Tapahtuman päivitys onnistui!');
        }
        catch(err){
            console.log(err.message);
            toast.error('Tapahtuman päivitys epäonnistui!');
        }
        finally{
            setLoading(false);
            setShowEditModal(false);
        }
    }

    const date = new Date(props.event.time).toLocaleDateString('de-DE');

    return (
        <>
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} id="event-edit-modal">
                <Modal.Header>Muokkaa</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group>
                            <label>Otsikko</label>
                            <input name="title" required defaultValue={props.event.title}/>
                        </Form.Group>

                        <Form.Group>
                            <label>Kuvaus</label>
                            <textarea name="description" defaultValue={props.event.description} maxLength={200}/>
                        </Form.Group>

                        <Form.Group>
                            <label>Päiväys</label>
                            <input type="date" name="time" defaultValue={date} placeholder={date}/>
                        </Form.Group>

                        <Form.ButtonGroup>
                            <Button
                                className="secondary"
                                desktopText="Peruuta"
                                onClick={() => setShowEditModal(false)}
                                disabled={loading}
                            />

                            <Button
                                type="submit"
                                className="primary"
                                desktopText="Päivitä"
                                disabled={loading}
                                loading={loading}
                            />
                        </Form.ButtonGroup>
                    </Form>
                </Modal.Body>
            </Modal>

            <InfoContainer event={props.event} setShowEditModal={setShowEditModal}/>
        </>
    )
}