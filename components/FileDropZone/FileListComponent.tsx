import Image from "next/image"
import ImageIcon from '@/assets/image.png';
import FileIcon from '@/assets/copy.png';
import style from './style.module.scss';
import { useEffect, useRef } from "react";

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
    )
}   

export default function FileListComponent(props: {
    files: File[],
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
        </div>
    )
}