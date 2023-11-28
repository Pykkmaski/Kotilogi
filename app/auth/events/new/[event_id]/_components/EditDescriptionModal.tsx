'use client';

import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";
import Button from "kotilogi-app/components/Button/Button";
import Form from "kotilogi-app/components/Form";
import Modal from "kotilogi-app/components/Modals/Modal";
import { useEventContext } from "../_util/EventContextProvider";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
    show: boolean,
    onHide: () => void,
}

export default function EditDescriptionModal(props: Props){
    const {event} = useEventContext();
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await serverUpdateDataById({title: e.target.title.value, description: e.target.description.value}, event.id, 'propertyEvents');
        if(!result) {
            toast.error('Tapahtuman päivitys epäonnistui!');
            return;
        }
        else{
            toast.success('Tapahtuma päivitetty onnistuneesti!');
        }

        props.onHide();
        setLoading(false);
        await serverRevalidatePath('/auth/events/new/[event_id]');
    }

    return (
        <Modal show={props.show} onHide={props.onHide} id={`edit-event-description-modal`}>
            <Modal.Header>Muokkaa Tapahtumaa</Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group>
                        <label>Otsikko</label>
                        <input name="title" type="text" defaultValue={event.title} required/>
                    </Form.Group>

                    <Form.Group>
                        <label>Kuvaus</label>
                        <textarea name="description" defaultValue={event.description}/>
                    </Form.Group>

                    <Form.ButtonGroup>
                        <Button
                            className="secondary"
                            desktopText="Peruuta"
                            onClick={props.onHide}
                            disabled={loading}
                        />

                        <Button
                            className="primary"
                            desktopText="Päivitä"
                            disabled={loading}
                            loading={loading}
                            type="submit"
                        />
                    </Form.ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
}