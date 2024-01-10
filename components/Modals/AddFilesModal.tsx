import { useRef, useState } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import FileDropZone from "../FileDropZone/FileDropZone";
import Modal, { ModalProps } from "./Modal";
import { useChangeFile } from "kotilogi-app/hooks/useChangeInput";
import { upload } from "kotilogi-app/actions/file/upload";
import { StatusType } from "./BaseAddModal.hooks";

function getModalHeader(fileType: Kotilogi.MimeType){
    if(fileType === 'application/pdf'){
        return 'Lisää Tiedostoja';
    }
    else{
        return 'Lisää Kuvia';
    }
}

function useAddFilesModal(refId: Kotilogi.IdType, tableName: 'propertyFiles' | 'eventFiles', onHide: () => void){
    const [status, setStatus] = useState<StatusType>('idle');
    const {files, onFile} = useChangeFile();
    const formRef = useRef<HTMLFormElement | null>(null);

    const onSubmit = (e) => {
        e.preventDefault();
        const data: FormData[] = [];
        for(const file of files){
            const formData = new FormData();
            formData.append('file', file);
            formData.append('refId', refId);
            data.push(formData);
        }

        upload(data, tableName)
        .then(() => closeModal())
        .catch(err => console.log(err.message));
    }

    const closeModal = () => {
        formRef.current?.reset();
        onHide();
    }

    return {status, files, onFile, onSubmit, formRef, closeModal};
}

type AddFilesModalProps = ModalProps & {
    refId: Kotilogi.IdType,
    tableName: 'propertyFiles' | 'eventFiles',
    fileType: Kotilogi.MimeType,
}

export function AddFilesModal({refId, fileType, ...props}: AddFilesModalProps){
    const {
        files, 
        onFile, 
        status,
        onSubmit,
        closeModal,
    } = useAddFilesModal(refId, props.tableName, props.onHide);

    return (
        <Modal {...props}>
            <Modal.Header>{getModalHeader(fileType)}</Modal.Header>
            <Modal.Body>
                <form onSubmit={onSubmit}>
                    <FileDropZone
                        name="file"
                        accept={fileType}
                        onFileUploaded={onFile}
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <SecondaryButton desktopText="Peruuta" onClick={closeModal}/>
                <PrimaryButton desktopText="Lähetä"/>
            </Modal.Footer>
        </Modal>
    );
}