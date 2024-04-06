import { MutableRefObject, createContext, forwardRef, useContext, useRef, useState } from "react";
import { useAddDataModal } from "./Modal.hooks";
import * as properties from '@/actions/properties';
import Modal, { ModalRefType } from "./Modal";
import { CloseButton } from "@/components/CloseButton";
import Button from "@/components/Button/Button";
import { Input, Select, Textarea } from "@/components/Input/Input";
import { buildingTypes, serviceName } from "kotilogi-app/constants";
import Link from "next/link";
import { addProperty } from "kotilogi-app/actions/experimental/addProperty";

type StepType = 'intro' | 'create_new' | 'add_with_token';

type AddPropertyModalContextProps = {
    step: StepType;
    owner: string;
    modalRef: MutableRefObject<ModalRefType>;
    formId: string;
    formRef: MutableRefObject<HTMLFormElement>;
    updateData: (e: TODO) => void;
    onSubmit: (e: TODO) => Promise<void>;
    setStep: React.Dispatch<React.SetStateAction<StepType>>;
}

const AddPropertyModalContext = createContext<AddPropertyModalContextProps>(null);

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

function IntroStep(){
    const {setStep} = useAddPropertyModalContext();

    const SelectorButton = ({children, ...props}: React.ComponentProps<'div'>) => {
        return (
            <div {...props} className="aspect-square rounded-lg bg-gray-200 flex items-center justify-center text-lg p-4 cursor-pointer">
                {children}
            </div>
        );
    }

    return (
        <div className="w-full flex justify-center items-center gap-4">
            <SelectorButton onClick={() => setStep('create_new')}>
                <span>1</span>
            </SelectorButton>

            <SelectorButton onClick={() => setStep('add_with_token')}>
                <span>2</span>
            </SelectorButton>
        </div>
    );
}

type CreateNewStepProps = {
    ref: MutableRefObject<ModalRefType>;
}
function CreateNewStep(){
    const {modalRef, updateData, formId, onSubmit, formRef} = useAddPropertyModalContext();
    
    return (
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
    )
}

type AddPropertyModalProps = {
    owner: string;
}

function AddPropertyModal({owner}: AddPropertyModalProps, ref: MutableRefObject<ModalRefType>){
    const [step, setStep] = useState<StepType>('create_new');
    const formId = 'add-property-form';
    const formRef = useRef<HTMLFormElement>(null);
    const {onSubmit, cleanup, updateData, status} = useAddDataModal(ref, addProperty, formRef, {refId: owner});
    const loading = status === 'loading';
    
    const reset = () => {
        //setStep('intro');
        cleanup();
    }

    return (
        <Modal ref={ref}>
            <Modal.Header>
                <h1 className="text-xl text-slate-500">Lisää Talo</h1>
                <Modal.CloseTrigger>
                    <CloseButton onClick={() => reset()}/>
                </Modal.CloseTrigger>
            </Modal.Header>

            <Modal.Body>
                <AddPropertyModalContext.Provider value={{
                    step, 
                    owner,
                    modalRef: ref, 
                    formRef, 
                    formId, 
                    onSubmit,
                    updateData,
                    setStep,
                    }}>

                    {
                        step === 'intro' ? <IntroStep/>
                        :
                        step === 'create_new' ? <CreateNewStep/>
                        :
                        null
                    }

                </AddPropertyModalContext.Provider>
            </Modal.Body>

            <Modal.Footer>
                <Modal.CloseTrigger>
                    <Button variant="secondary" onClick={() => reset()} disabled={loading}>
                        <span>Peruuta</span>
                    </Button>
                </Modal.CloseTrigger>

                <Button variant="primary-dashboard" loading={status === 'loading'} form={formId} disabled={loading}>
                    <span className="mx-8">Lähetä</span>
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

function useAddPropertyModalContext(){
    const ctx = useContext(AddPropertyModalContext);
    if(!ctx) throw new Error('useAddPropertyModalContext must be used within the scope of an AddPropertyModalContext!');
    return ctx;
}
export default forwardRef(AddPropertyModal);