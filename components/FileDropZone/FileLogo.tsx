import Image from "next/image";
import FileIcon from '@/assets/copy.png';
import ImageIcon from '@/assets/image.png';

import style from './style.module.scss';
import { useDropzoneContext } from "./FileDropZone";

export default function FileLogo(props: React.ComponentProps<'div'>){
    const {triggerFileInput, accept} = useDropzoneContext();

    const icon = (
        accept === 'image/jpeg' ? ImageIcon : accept === 'application/pdf' ? FileIcon : FileIcon
    );

    return (
        <div className={style.fileLogo} {...props} onClick={triggerFileInput}>
            <Image
                src={icon}
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