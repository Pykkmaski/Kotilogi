'use client';

import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";
import Button from "kotilogi-app/components/Button/Button";
import Form from "kotilogi-app/components/Form";
import Modal from "kotilogi-app/components/Modals/Modal";
import { usePropertyContext } from "../_util/PropertyContextProvider";
import { useState } from "react";

type Props = {
    show: boolean,
    onHide: () => void,
}

export default function EditDescriptionModal(props: Props){
    const {property} = usePropertyContext();
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await serverUpdateDataById({description: e.target.description.value}, property.id, 'properties');
        if(!result) {
            console.log('Failed to update property description!');
            return;
        }

        props.onHide();
        setLoading(false);
        await serverRevalidatePath('/auth/properties/new/[property_id]');
    }

    return (
        <Modal show={props.show} onHide={props.onHide} id={`edit-property-description-modal`}>
            <Modal.Header>Muokkaa Kuvausta</Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group>
                        <label>Kuvaus</label>
                        <textarea name="description" defaultValue={property.description}/>
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