import { useEffect, useRef, useState } from "react";

/**A hook to hold data from inputs. 
 * Its responsibility is to store the data in an object as well as keep track of if the data has changed from the initial value.
 */

export function useChangeInput<DataT>(initialData: DataT){
    const [data, setData] = useState<DataT>(initialData);
    const [isEdited, setIsEdited] = useState(false);

    const onChange = (e) => {
        setData(prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value,
            }
        });

        setIsEdited(true);
    }

    const resetIsEdited = () => {
        setIsEdited(false);
    }

    return {
        data,
        onChange,
        isEdited,
        resetIsEdited,
    }
}

export function useChangeFile(){
    const [files, setFiles] = useState<File[]>([]);
    const [isEdited, setIsEdited] = useState(false);

    /**The onChange method passed into an input accepting files */
    const onFile = (e) => {
        const newFiles = [...files, e.target.file];
        setFiles(newFiles);
        setIsEdited(true);
    }

    const removeFile = (file) => {
        const newFiles = [...files];
        const indexOfFile = newFiles.indexOf(file);
        if(indexOfFile === -1) throw new Error('removeFile: trying to remove a file not in the array!');

        newFiles.splice(indexOfFile, 1);
        setFiles(newFiles);
        setIsEdited(true);
    }

    const resetIsEdited = () => setIsEdited(false);

    return {files, onFile, removeFile, isEdited, resetIsEdited};
}