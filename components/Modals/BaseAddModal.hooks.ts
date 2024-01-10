import { useChangeInput } from "kotilogi-app/hooks/useChangeInput";
import { useEffect, useRef, useState } from "react";

export type StatusType = 'idle' | 'loading' | 'error' | 'success';

export function useStatus(initialState: StatusType){
    const [status, setStatus] = useState<StatusType>(initialState);
    return [status, setStatus] as const;
}

export function useAddModal(
    refId: Kotilogi.IdType, 
    submitFunction: (data: FormData) => Promise<object>, 
    onHide: () => void){
        
    const [status, setStatus] = useState<StatusType>('idle');
    const {data, onChange} = useChangeInput({refId});
    const formRef = useRef<HTMLFormElement | null>(null);
    
    const action = (formData: FormData) => {
        formData.append('refId', refId);

        submitFunction(formData)
        .then(res => {
            setStatus('success');
            
        })
        .catch(err => setStatus('error'))
        .finally(() => closeModal());
    }

    const closeModal = () => {
        formRef.current?.reset();
        onHide();
    }

    return {
        status,
        onChange,
        action,
        formRef,
        closeModal,
    }
}

/**Hook to contain uploaded files before they are submitted.
 * @param defaultData The default data to be inserted alongside every file.
 * @returns The files and a function to update them.
 */
export function useInputFiles(){
    const [files, setFiles] = useState<FormData[]>([]);

    const updateFiles = (e) => {
        const uploadedFiles = e.target.files;

        const newFiles: FormData[] = [];
        for(var i = 0; i < uploadedFiles.length; ++i){
            const data = new FormData();
            data.append('file', uploadedFiles[i]);
            newFiles.push(data);
        }
        setFiles(newFiles);
    }
    
    return {files, updateFiles};
}

/**Hook to store the data of the inputs contained within a form. 
 * @returns An object containing the input data inside an object, and a function to update the data.
*/
export function useInputData(initialData){
    const [data, setData] = useState(initialData);

    const updateData = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value,
        });
    }

    return {data, updateData};
}