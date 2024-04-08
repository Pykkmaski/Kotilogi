'use client';

import Button from "@/components/Button/Button";
import { CloseButton } from "@/components/CloseButton";
import Modal, { ModalRefType } from "@/components/Experimental/Modal/Modal";
import SubmitDataModal from "@/components/Experimental/Modal/SubmitDataModal";
import { Input } from "@/components/Input/Input";
import { activateProperty } from "kotilogi-app/actions/experimental/properties";
import { forwardRef } from "react";
import toast from "react-hot-toast";

type ActivatePropertyModalProps = {
    property: Kotilogi.PropertyType;
}

function ActivatePropertyModal({property}: ActivatePropertyModalProps, ref: React.Ref<ModalRefType>){

    return (
        <SubmitDataModal ref={ref} submitMethod={async (data: TODO) => {
            await activateProperty({customer: property.refId, propertyId: property.id, password: data.password})
            .then(() => {
                toast.success('Talon käyttöönotto onnistui!');
            });
        }}>
            
            <Modal.Header>
                <h1 className="text-xl text-slate-500">Ota talo käyttöön</h1>
                <SubmitDataModal.CloseTrigger>
                    <CloseButton/>
                </SubmitDataModal.CloseTrigger>
            </Modal.Header>

            <Modal.Body>
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl text-slate-500">Talon käyttöönotto</h2>
                    <p>
                        Ota tällä lomakkeella valittu talo uudelleen käyttöön.<br/>
                        Huomioi, että jokaisen talon käyttöön otosta veloitetaan <span className="text-green-700">49,90€</span> (+ALV 24%).
                    </p>
                    <SubmitDataModal.Form className="mt-8">
                        <Input
                            label="Salasana"
                            placeholder="Kirjoita salasanasi..."
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                        />
                    </SubmitDataModal.Form>
                </div>
                
            </Modal.Body>

            <Modal.Footer>
                <SubmitDataModal.CloseTrigger>
                    <Button variant="secondary">
                        Peruuta
                    </Button>
                </SubmitDataModal.CloseTrigger>

                <SubmitDataModal.SubmitTrigger>
                    <Button variant="primary-dashboard">
                        <span className="mx-8">Lähetä</span>
                    </Button>
                </SubmitDataModal.SubmitTrigger>
            </Modal.Footer>
        </SubmitDataModal>
    )
}

export default forwardRef(ActivatePropertyModal);