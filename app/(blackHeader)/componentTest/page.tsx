'use client';

import Button from "@/components/Button/Button";
import { CloseButton } from "@/components/CloseButton";
import Modal, { ModalRefType } from "@/components/Experimental/Modal/Modal";
import MultiStepModal, { MultiStepModalMethods } from "@/components/Modals/MultiStepModal";
import { useRef, useState } from "react";

export default function ComponentTestPage(){
    const [selectedStep, setSelectedStep] = useState<'add_with_key' | 'add_blank'>('add_blank');

    const testModalRef = useRef<ModalRefType>(null);

    const AddBlank = () => <h2>Lisää Tiedot Itse</h2>;
    const AddWithKey = () => <h2>Lisää Varmenteella</h2>

    return (
        <main className="flex flex-col items-start">
            <Button variant="primary-dashboard" onClick={() => testModalRef.current?.toggleOpen()}>
                <span className="mx-8">Avaa Lomake</span>
            </Button>
            <Modal ref={testModalRef}>
                <div className="flex flex-col gap-4 md:min-w-[500px] rounded-md shadow-lg">
                    {/**Header */}
                    <Modal.Header>
                        <h1 className="text-xl">Testilomake</h1>
                        <Modal.CloseTrigger>
                            <CloseButton/>
                        </Modal.CloseTrigger>
                    </Modal.Header>
                    
                    {/**Body */}
                    <div className="w-full p-4 flex items-center">
                        <span>Testi</span>
                    </div>

                    <Modal.Footer>
                        <Modal.CloseTrigger>
                            <Button variant="primary-dashboard">
                                <span className="mx-8">Sulje</span>
                            </Button>
                        </Modal.CloseTrigger>
                    </Modal.Footer>
                </div>
            </Modal>
        </main>
        
    );
}