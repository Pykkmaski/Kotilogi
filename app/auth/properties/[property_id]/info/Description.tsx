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
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try{
            setLoading(true);
            const description = e.target.description.value;
            const result = await serverUpdateDataById({description}, props.property.id, 'properties');
            if(!result) throw new Error('Failed to update property description!');
            await serverRevalidatePath('/auth/properties/[property_id]/info');
        }
        catch(err){
            console.log(err.message);
            toast.error('Kuvauksen päivitys epäonnistui!');
        }
        finally{
            setLoading(false);
            setShowEditModal(false);
        }
    }
    return (
        <>
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} id={`property-description-edit-modal`}>
                <Modal.Header>Muokkaa Kuvausta</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group>
                            <label>Kuvaus</label>
                            <textarea defaultValue={props.property.description} name="description" spellCheck={false}/>
                        </Form.Group>

                        <Form.ButtonGroup>
                            <Button
                                className="secondary"
                                desktopText="Peruuta"
                                onClick={() => setShowEditModal(false)}
                                disabled={loading}
                            />

                            <Button
                                className="primary"
                                desktopText="Päivitä"
                                type="submit"
                                loading={loading}
                                disabled={loading}
                            />
                        </Form.ButtonGroup>
                    </Form>
                </Modal.Body>
            </Modal>

            <p onClick={() => setShowEditModal(true)} title={'Muokkaa klikkaamalla'}>
                {props.property.description}
            </p>
        </>
    );
}