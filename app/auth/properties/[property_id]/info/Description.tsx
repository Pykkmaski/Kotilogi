'use client';

import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";
import Button from "kotilogi-app/components/Button/Button";
import Form from "kotilogi-app/components/Form";
import Modal from "kotilogi-app/components/Modals/Modal";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
    property: Kotilogi.PropertyType,
}

export default function Description(props: Props){
    const [showEditModal, setShowEditModal] = useState(false);
    
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try{
            const description = e.target.description.value;
            const result = await serverUpdateDataById({description}, props.property.id, 'properties');
            if(!result) throw new Error('Failed to update property description!');
            await serverRevalidatePath('/auth/properties/[property_id]/info');
        }
        catch(err){
            console.log(err.message);
            toast.error('Kuvauksen päivitys epäonnistui!');
        }
    }
    return (
        <>
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header>Muokkaa Kuvausta</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <label>Kuvaus</label>
                            <textarea defaultValue={props.property.description}/>
                        </Form.Group>

                        <Form.ButtonGroup>
                            <Button
                                className="secondary"
                                desktopText="Peruuta"
                                onClick={() => setShowEditModal(false)}
                            />

                            <Button
                                className="primary"
                                desktopText="Päivitä"
                                type="submit"
                            />
                        </Form.ButtonGroup>
                    </Form>
                </Modal.Body>
            </Modal>

            <p onClick={() => setShowEditModal(true)}>
                {props.property.description}
            </p>
        </>
    );
}