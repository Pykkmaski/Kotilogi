'use client';

import { MutableRefObject, forwardRef, useState } from "react";
import Modal, { ModalRefType } from "./Modal";
import { CloseButton } from "@/components/CloseButton";
import Button from "@/components/Button/Button";
import { activateProperty } from "kotilogi-app/actions/activateProperty";
import toast from "react-hot-toast";
import { Input } from "@/components/Input/Input";
import { useInputData } from "@/components/Modals/BaseAddModal.hooks";
import { ErrorMessage, Group } from "@/components/Util/FormUtils";

type ActivatePropertyModalProps = {
    property: Kotilogi.PropertyType;
}

function ActivatePropertyModal({property}: ActivatePropertyModalProps, ref: MutableRefObject<ModalRefType>){
    const [status, setStatus] = useState<'idle' | 'loading' | 'invalid_password'>('idle');
    const {data, updateData} = useInputData({customer: property.refId})
    const activate = (e) => {
        e.preventDefault();
        

        setStatus('loading');
        activateProperty({
            ...data,
            propertyId: property.id
        })
        .then(() => {
            toast.success(`Talon käyttöönotto onnistui!`);
            setStatus('idle');
            ref.current?.toggleOpen(false);
        })
        .catch(err => {
            if(err.message.toLowerCase().includes('password')){
                setStatus('invalid_password');
            }
        });
    }

    const loading = status === 'loading';
    const formId = `activate-property-modal-${property.id}`;

    return (
        <Modal ref={ref}>
            <Modal.Header>
                <h2 className="text-xl">Ota talo käyttöön</h2>
                <Modal.CloseTrigger>
                    <CloseButton/>
                </Modal.CloseTrigger>
            </Modal.Header>

            <Modal.Body>
                <form className="lg:w-[700px] xs:w-full my-8 flex flex-col gap-4" id={formId} onSubmit={activate}>
                    <p>
                        Olet ottamassa talon <strong className="font-semibold">{property.title}</strong> uudelleen käyttöön. Oletko varma?<br/>
                        Käyttöönotto maksaa <span className="text-green-700">49,90€.</span>
                    </p>

                    <Group>
                        <Input 
                            label="Salasana"
                            placeholder="Anna salasanasi..."
                            required
                            name="password"
                            onChange={updateData}
                            type="password"
                            autoComplete="new-password"
                        />
                        {
                            status === 'invalid_password' ? <ErrorMessage>Annettu salasana on väärä!</ErrorMessage> : null
                        }
                    </Group>
                    

                    
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Modal.CloseTrigger>
                    <Button variant="secondary" disabled={loading}>Sulje</Button>
                </Modal.CloseTrigger>

                <Button variant="primary-dashboard" disabled={loading} loading={loading} form={formId} type="submit">
                    <span className="mx-8">Ota käyttöön</span>
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default forwardRef(ActivatePropertyModal);