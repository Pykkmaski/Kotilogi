import { InputHTMLAttributes, createContext, useContext, useRef, useState } from 'react';
import style from './style.module.scss';
import FileListComponent from './FileListComponent';
import FileLogo from './FileLogo';

type DropZoneValueType = {
    files: File[],
    triggerFileInput: () => void,
    removeFile: (file: File) => void,
}

const DropZoneContext = createContext<DropZoneValueType | null>(null);

export function useDropzoneContext(){
    const context = useContext(DropZoneContext);
    if(!context) throw new Error('DropZone context cannot be null!');
    return context;
}

export default function FileDropZone(props: {
    name: string,
    accept: string,
    form?: string,
    onFileUploaded: (e) => void,
    onError?: (e) => void,
}){
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    
    const onFileUploaded = (e) => {
        const newFiles = [...files];
        const filesUploaded: FileList = e.target.files;
        console.log(filesUploaded);

        for(var i = 0; i < filesUploaded.length; ++i){
            newFiles.push(filesUploaded[i]);
        }

        setFiles(newFiles);
        props.onFileUploaded(newFiles);
    }

    const triggerFileInput = () => {
        if(!fileInputRef.current) return;
        fileInputRef.current.click();
    }

    const removeFile = (file: File) => {
        const newFiles = [...files];
        const indexOfFile = newFiles.indexOf(file);
        if(indexOfFile === -1) return;

        
        newFiles.splice(indexOfFile, 1);
        setFiles(newFiles);
    }

    return (
        <DropZoneContext.Provider value={{
            files,
            triggerFileInput,
            removeFile,
        }}>
            <input 
                name={props.name} 
                type="file" 
                accept={props.accept}
                title="Ei valittuja tiedostoja"
                multiple={true}
                form={props.form}
                onChange={onFileUploaded}
                hidden={true}
                ref={fileInputRef}
            />

            <div className={style.dropZoneArea}>
                {
                    files.length ? <FileListComponent/>
                    :
                    <FileLogo/>
                }
            </div>
        </DropZoneContext.Provider>
    );
}