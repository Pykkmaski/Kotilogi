import Image from "next/image"
import ImageIcon from '@/assets/image_filled.png';
import FileIcon from '@/assets/copy_filled.png';
import style from './style.module.scss';
import { useEffect, useRef } from "react";
import PrimaryButton from "../Button/PrimaryButton";

function DeleteButton(){
    return (
        <div className={style.deleteButton} title="Poista">
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
    
    return (
        <div className={style.item}>
            <div className={style.fileContent}>
                {
                    props.file.type === 'image/jpeg' ? 
                    <>
                        <Image
                            src={ImageIcon}
                            width={imageSize}
                            height={imageSize}
                            alt=""
                            ref={imageRef}
                        />
                    </>
                    
                    :
                    <>
                        <Image
                            src={FileIcon}
                            width={imageSize}
                            height={imageSize}
                            alt=""
                        />
                    </>
                }

                <span>{props.file.name}</span>
            </div>

            <DeleteButton/>
        </div>
    )
}   

export default function FileListComponent(props: {
    files: File[],
    triggerFileInput: () => void,
}){
    return (
        <div className={style.fileList}>
            {
                props.files.map((file, index) => {
                    return (
                        <Item file={file} key={`file-list-item-${index}`}/>
                    )
                })
            }
            <PrimaryButton desktopText="Lisää Tiedosto" onClick={props.triggerFileInput}/>
        </div>
    )
}