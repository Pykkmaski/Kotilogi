import { PrimaryButton } from "../Button/PrimaryButton";
import { SecondaryButton } from "../Button/SecondaryButton";
import { Group } from "../Group";
import { Input } from "../Input/Input";
import Modal, { ModalProps } from "../Modals/Modal";

export function PaymentModal(props: ModalProps){
    const closeModal = () => {
        props.onHide();
    }

    const formId = `${props.id}-form`;

    return (
        <Modal {...props}>
            <Modal.Header>
                <span className="text-slate-500">Suorita Maksu</span>
            </Modal.Header>
            <Modal.Body>
                <Group direction="col" gap={4}>
                    <span className="text-lg text-slate-500">Olet suorittamassa maksua summalla <span className="text-xl">49,90€</span></span>
                    <form className="lg:min-w-[700px] flex flex-col gap-4" id={formId}>
                        <Input label="Nimesi" description="Koko nimesi." placeholder="Kirjoita koko nimesi..."/>
                        <Input label="Kortti" description="Kortin numero." placeholder="Kirjoita kortin etupuolella oleva numero..."/>
                    </form>
                </Group>
                
            </Modal.Body>

            <Modal.Footer>
                <Group direction="row" gap={4}>
                    <SecondaryButton onClick={closeModal}>Peruuta</SecondaryButton>
                    <PrimaryButton type="submit" form={formId}>Maksa</PrimaryButton>
                </Group>  
            </Modal.Footer>
        </Modal>
    );
}