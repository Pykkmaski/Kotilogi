import Button from "@/components/Button/Button";
import { CloseButton } from "@/components/CloseButton";
import Modal, { ModalRefType } from "@/components/Experimental/Modal/Modal";
import { MutableRefObject, forwardRef, useRef, useState } from "react";
import { Input } from "../Input/Input";
import { useItemContext } from "./DataList";
import * as usage from '@/actions/usage';
import toast from "react-hot-toast";

function EditUsageModal(props, ref: MutableRefObject<ModalRefType>){
    const {item} = useItemContext();
    
    const initialData = {id: item.id};
    const formRef = useRef<HTMLFormElement | null>(null);
    const [status, setStatus] = useState<'loading' | 'idle'>('idle');

    const closeModal = () => {
        formRef.current?.reset();
        props.onHide();
    }

    const update = (e) => {
        e.preventDefault();
        setStatus('loading');

        const d = {
            ...item,
            price : e.target.price.valueAsNumber,
        }

        usage.update(d)
        .catch(err => toast.error(err.message))
        .finally(() => {
            closeModal();
            setStatus('idle');
        });
    }

    const loading = status === 'loading';

    const formId = props.id + '-form';

    return (
        <Modal ref={ref}>
            <Modal.Header>
                <h1 className="text-xl text-slate-500">Muokkaa tietoa</h1>
                <Modal.CloseTrigger>
                    <CloseButton/>
                </Modal.CloseTrigger>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={update} id={formId}>
                    <Input 
                        label="Hinta"
                        description="Laskun hinta."
                        name="price" 
                        type="number" 
                        step="0.01"
                        min="0.01"
                        defaultValue={item.price} 
                    />
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Modal.CloseTrigger>
                    <Button variant="secondary">Peruuta</Button>
                </Modal.CloseTrigger>

                <Button variant="primary-dashboard" loading={loading} disabled={loading} form={formId}>
                    <span className="mx-8">Lähetä</span>
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default forwardRef(EditUsageModal);