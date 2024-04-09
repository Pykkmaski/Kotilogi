import { useInputData, useInputFiles } from "@/components/Modals/BaseAddModal.hooks";
import { MutableRefObject, useState } from "react";
import toast from "react-hot-toast";
import { ModalRefType } from "./Modal";

/**
 * A hook to use in the creation of modals containing a form, that submits data.
 * @param submitMethod 
 * @param formRef 
 * @param initialData The default data before any inputs in the form have changed.
 */
export function useAddDataModal(modalRef: MutableRefObject<ModalRefType>, submitMethod: Function, formRef: MutableRefObject<HTMLFormElement>, initialData: {}){
    const {data, updateData} = useInputData(initialData);
    const {files, updateFiles} = useInputFiles();
    const [status, setStatus] = useState<'loading' | 'idle'>('idle')

    const onSubmit = async (e) => {
        e.preventDefault();

        setStatus('loading');

        submitMethod(data, files)
        .then(res => {
            setStatus(res);
            cleanup();
        })
        .catch(err => {
            toast.error(err.message);
        })
        .finally(() => {
            setStatus('idle');
            modalRef.current?.toggleOpen(false);
        });
    }

    const cleanup = () => {
        formRef.current?.reset();
    }

    return {onSubmit, cleanup, updateData, updateFiles, status} as const;
}

/**
 * A hook to include in modals that preform a deletion on multiple items at once.
 */
export function useDeleteDataModal(modalRef: MutableRefObject<ModalRefType>, deleteMethod: Function, itemsToBeDeleted: Kotilogi.ItemType[]){
    const [status, setStatus] = useState<'idle' | 'loading'>('idle');

    const executeDelete = () => {
        const promises: Promise<void>[] = [];
        for(const item of itemsToBeDeleted){
            promises.push(
                deleteMethod(item)
            );
        }
        setStatus('loading');
        Promise.all(promises).catch(err => toast.error('Joidenkin kohteiden poisto epäonnistui!'))
        .finally(() => {
            setStatus('idle');
            modalRef.current?.toggleOpen(false);
        });
    }

    return {
        status,
        executeDelete,
    }
}