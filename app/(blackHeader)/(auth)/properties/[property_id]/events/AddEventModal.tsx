import { MutableRefObject, forwardRef } from "react";
import Modal, { ModalRefType } from "../../../../../../components/Experimental/Modal/Modal";
import { CloseButton } from "@/components/CloseButton";
import { Input, Textarea } from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { addEvent } from "kotilogi-app/actions/experimental/events";
import SubmitDataModal from "@/components/Experimental/Modal/SubmitDataModal";
import toast from "react-hot-toast";

type AddEventModalProps = {
    propertyId: string;
}

function AddEventModal({propertyId}: AddEventModalProps, ref: MutableRefObject<ModalRefType>){

    return (
        <SubmitDataModal ref={ref} submitMethod={async (data, files?) => {
            await addEvent({...data, refId: propertyId} as TODO, files)
            .then(() => toast.success('Tapahtuman lisäys onnistui!'));
        }}>
            <Modal.Header>
                <h1 className="text-xl text-slate-500">Lisää Tapahtuma</h1>
                <Modal.CloseTrigger>
                    <CloseButton/>
                </Modal.CloseTrigger>
            </Modal.Header>

            <Modal.Body>
                <SubmitDataModal.Form className="flex flex-col gap-4 lg:min-w-[700px] xs:w-full">
                    <Input
                        name="title"
                        label="Otsikko"
                        description="Tapahtuman otsikko."
                        placeholder="Kirjoita otsikko..."
                        required={true}
                        autoComplete="off"/>

                    <Input 
                        name="time"
                        label="Päiväys"
                        description="Tapahtuman päivämäärä."
                        required
                        type="date"/>

                    <Textarea 
                        label="Kuvaus" 
                        description="Tapahtuman lyhyt kuvaus." 
                        placeholder="Kirjoita kuvaus..." 
                        spellCheck={false}
                        name="description"/>

                    <Input
                        name="file"
                        type="file"
                        accept="application/pdf,image/jpeg"
                        label="Tiedostot ja kuvat"
                        description="Lähetä samalla tapahtumaan liittyviä tiedostoja ja kuvia."
                        multiple={true}/>
                </SubmitDataModal.Form>
            </Modal.Body>

            <Modal.Footer>
                <SubmitDataModal.CloseTrigger>
                    <Button variant="secondary">
                        <span>Peruuta</span>
                    </Button>
                </SubmitDataModal.CloseTrigger>

                <SubmitDataModal.SubmitTrigger>
                    <Button variant="primary-dashboard">
                        <span className="mx-8">Lähetä</span>
                    </Button>
                </SubmitDataModal.SubmitTrigger>
            </Modal.Footer>
        </SubmitDataModal>
    );
}

export default forwardRef(AddEventModal);

