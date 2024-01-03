import Image from "next/image"
import style from './style.module.scss';
import { useEffect, useRef } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import { useDropzoneContext } from "./FileDropZone";

function DeleteButton(props: React.ComponentProps<'div'>){
    return (
        <div className={style.deleteButton} title="Poista" {...props}>
            <div className={style.cross}>
                <div className={style.line}></div>
                <div className={style.line}></div>
            </div>
        </div>
    );
}

function Item(props: {
    file: File,
}){
    const imageSize = 50;
    const imageRef = useRef<any>(null);
    const {removeFile} = useDropzoneContext();

    return (
        <div className={style.item}>
            <div className={style.fileContent}>
                {
                    props.file.type === 'image/jpeg' ? 
                    <>
                        <Image
                            src={'/icons/image.png'}
                            width={imageSize}
                            height={imageSize}
                            alt=""
                            ref={imageRef}
                        />
                    </>
                    
                    :
                    <>
                        <Image
                            src={'/icons/copy.png'}
                            width={imageSize}
                            height={imageSize}
                            alt=""
                        />
                    </>
                }

                <span>{props.file.name}</span>
            </div>

            <DeleteButton onClick={() => removeFile(props.file)}/>
        </div>
    )
}   

export default function FileListComponent(){
    const {files, triggerFileInput} = useDropzoneContext();

    return (
        <div className={style.fileList}>
            {
                files.map((file, index) => {
                    return (
                        <Item file={file} key={`file-list-item-${index}`}/>
                    )
                })
            }
            <PrimaryButton desktopText="Lisää Tiedosto" onClick={triggerFileInput}/>
        </div>
    )
}