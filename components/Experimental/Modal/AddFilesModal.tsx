'use client';

import { forwardRef, useRef, useState } from "react";
import Modal, { ModalRefType } from "./Modal";
import { useAddDataModal } from "./Modal.hooks";
import { CloseButton } from "@/components/CloseButton";
import Button from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { useInputFiles } from "@/components/Modals/BaseAddModal.hooks";
import { upload } from "kotilogi-app/actions/file";
import toast from "react-hot-toast";

type AddFilesModalProps = {
    /**To what item these files belong to */
    refId: string;
    uploadMethod: (fdata: FormData, refId: string) => Promise<void>;
    accept: string;
}

function AddFilesModal({refId, accept, uploadMethod}: AddFilesModalProps, ref: React.MutableRefObject<ModalRefType>){
    const formRef = useRef<HTMLFormElement>(null);
    const {files, updateFiles} = useInputFiles();
    const [status, setStatus] = useState<'idle' | 'loading'>('idle');
    const formId = `add-files-modal-${refId}`;

    const uploadFiles = (e) => {
        e.preventDefault();
        setStatus('loading');

        const promises: Promise<void>[] = [];
        for(const fdata of files){
            promises.push(
                uploadMethod(fdata, refId)
            );
        }
        
        Promise.all(promises)
        .catch(err => {
            toast.error(err.message);
        })
        .finally(() => {
            setStatus('idle');
            ref.current?.toggleOpen(false);
        });
    }

    const loading = status === 'loading';

    return (
        <Modal ref={ref}>
            <Modal.Header>
                <h1 className="text-xl text-slate-500">Lisää Tiedostoja</h1>
                <Modal.CloseTrigger>
                    <CloseButton/>
                </Modal.CloseTrigger>
            </Modal.Header>

            <Modal.Body>
                <form ref={formRef} id={formId} onSubmit={uploadFiles} className="flex flex-col gap-4 md:w-[700px] xs:w-full">
                    <Input 
                        label="Tiedostot"
                        description="PDF tai JPEG"
                        type="file"
                        name="file"
                        accept={accept}
                        required
                        onChange={updateFiles}
                    />
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Modal.CloseTrigger>
                    <Button variant="secondary" disabled={loading}>
                        <span className="mx-8">Sulje</span>
                    </Button>
                </Modal.CloseTrigger>
                <Button variant="primary-dashboard" disabled={loading} loading={loading} form={formId}>
                    <span className="mx-8">Lähetä</span>
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default forwardRef(AddFilesModal);