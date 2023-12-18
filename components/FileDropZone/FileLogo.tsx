import Image from "next/image";
import FileIcon from '@/assets/copy.png';
import style from './style.module.scss';
import { useDropzoneContext } from "./FileDropZone";

export default function FileLogo(props: React.ComponentProps<'div'>){
    const {triggerFileInput} = useDropzoneContext();
    
    return (
        <div className={style.fileLogo} {...props} onClick={triggerFileInput}>
            <Image
                src={FileIcon}
                width={75}
                height={75}
                alt=""
            />

            <p>
                Klikkaa tähän ja valitse Tiedostot tietokoneeltasi.
            </p>
        </div>
    );
}