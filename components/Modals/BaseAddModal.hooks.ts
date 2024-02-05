import { useState } from "react";

export type StatusType = 'idle' | 'loading' | 'error' | 'success';

export function useStatus(initialState: StatusType){
    const [status, setStatus] = useState<StatusType>(initialState);
    return [status, setStatus] as const;
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
    const revertData = initialData;

    const updateData = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value,
        });
    }

    const reset = (resetData?: any) => {
        setData(resetData || revertData);
    }

    return {data, updateData, reset};
}

export function useAddModal(refId, submitMethod: (data: object, files?: FormData[]) => Promise<object>){
    const {data, updateData} = useInputData({refId});
    const {files, updateFiles} = useInputFiles();

    const onSubmit = (e) => {
        return submitMethod(data, files);
    }

    return {updateData, updateFiles, onSubmit}
}