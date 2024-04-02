import { MutableRefObject, forwardRef, useRef } from "react";
import { useAddDataModal } from "./Modal.hooks";
import * as properties from '@/actions/properties';
import Modal, { ModalRefType } from "./Modal";
import { CloseButton } from "@/components/CloseButton";
import Button from "@/components/Button/Button";
import { Input, Select, Textarea } from "@/components/Input/Input";
import { buildingTypes, serviceName } from "kotilogi-app/constants";
import Link from "next/link";

function PricingDescription(){

    const LongDescription = () => (
        <small className="text-sm text-slate-500 text-right mt-4">
            Jos maksua ei makseta kuukauden sisällä, lukkiutuu tilisi, ja avautuu kun maksu on suoritettu.<br/>
            Tapahtuman hinta lisätään nykyiseen ostoskoriisi, joka löytyy <Link href="/dashboard/cart" target="_blank" className="text-orange-500">täältä.</Link><br/>
            {serviceName} ei suorita maksujen palautuksia.
        </small>
    );
    
    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center w-full gap-4 justify-end">
                <span className="text-slate-500">Talojen vuosimaksu on <span className="text-green-600 text-lg">(9,90€)</span></span>
            </div>
            
        </div>
    );
}

type AddPropertyModalProps = {
    owner: string;
}

function AddPropertyModal({owner}: AddPropertyModalProps, ref: MutableRefObject<ModalRefType>){
    const formRef = useRef<HTMLFormElement>(null);
    const {onSubmit, cleanup, updateData, status} = useAddDataModal(ref, properties.add, formRef, {refId: owner});
    const formId = 'add-property-form';

    return (
        <Modal ref={ref}>
            <Modal.Header>
                <h1 className="text-xl text-slate-500">Lisää Talo</h1>
                <Modal.CloseTrigger>
                    <CloseButton onClick={() => cleanup()}/>
                </Modal.CloseTrigger>
            </Modal.Header>

            <Modal.Body>
                <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4" id={formId}>
                    <Input 
                        name="propertyNumber"
                        label="Kiinteistötunnus"
                        description="Talon kiinteistötunnus"
                        placeholder="Kirjoita talon kiinteistötunnus..."
                        required={true}
                        autoComplete="off"
                        onChange={updateData}/>
                
                    <Input
                        name="title"
                        label="Osoite"
                        description="Talon katuosoite."
                        placeholder="Kirjoita osoite..."
                        required={true}
                        autoComplete="off"
                        onChange={updateData}/>

                    <Input
                        name="zipCode"
                        label="Postinumero"
                        description="Talon viisinumeroinen postinumero."
                        placeholder="Kirjoita postinumero..."
                        maxLength={5}
                        minLength={5}
                        required={true}
                        autoComplete="off"
                        onChange={updateData}/>

                    <Input
                        name="buildYear"
                        label="Rakennusvuosi"
                        description="Vuosi jona talo valmistui."
                        placeholder="Kirjoita talon rakennusvuosi..."
                        required={true}
                        autoComplete="off"
                        onChange={updateData}/>

                    <Select name="buildingType" label="Talotyyppi" description="Talon tyyppi." onChange={updateData}>
                        {
                            buildingTypes.map(type => <Select.Option key={type}>{type}</Select.Option>)
                        }
                    </Select>

                    <Textarea 
                        label="Kuvaus" 
                        description="Talon lyhyt kuvaus." 
                        placeholder="Kirjoita kuvaus..." 
                        spellCheck={false}
                        name="description"
                        onChange={updateData}/>

                    <PricingDescription/>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Modal.CloseTrigger>
                    <Button variant="secondary" onClick={() => cleanup()}>
                        <span>Peruuta</span>
                    </Button>
                </Modal.CloseTrigger>

                <Button variant="primary-dashboard" loading={status === 'loading'} form={formId}>
                    <span className="mx-8">Lähetä</span>
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default forwardRef(AddPropertyModal);