"use client";

import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";
import Button from "kotilogi-app/components/Button/Button";
import Form from "kotilogi-app/components/Form";
import Modal from "kotilogi-app/components/Modals/Modal";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import style from './page.module.scss';

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
            const newData = {
                title: e.target.title.value,
                description: e.target.description.value,
                createdAt: e.target.date.value,
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
                            <input name="description" defaultValue={props.event.description}/>
                        </Form.Group>

                        <Form.Group>
                            <label>Päiväys</label>
                            <input type="date" name="date" defaultValue={props.event.createdAt}/>
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

            <span className={style.infoContainer} onClick={() => setShowEditModal(true)}>
                <h2>Kuvaus</h2>
                <p>
                    {props.event.description}
                </p>

                <h2>Päivämäärä</h2>
                <p>
                    {props.event.createdAt}
                </p>
            </span>
             
        </>
    )
}