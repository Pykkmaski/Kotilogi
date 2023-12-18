import { InputHTMLAttributes, useRef, useState } from 'react';
import style from './style.module.scss';
import FileListComponent from './FileListComponent';
import FileLogo from './FileLogo';

export default function FileDropZone(props: {
    name: string,
    accept: string,
    form?: string,
    onFileUploaded: (e) => void,
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

    return (
        <>
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
                    files.length ? <FileListComponent files={files} triggerFileInput={triggerFileInput}/>
                    :
                    <FileLogo onClick={triggerFileInput}/>
                }
            </div>
        </>
    );
}