import Image from "next/image";
import FileIcon from '@/assets/copy.png';
import style from './style.module.scss';

export default function FileLogo(props: {
    hidden?: boolean,
}){
    return (
        <div className={style.fileLogo} hidden={props.hidden}>
            <Image
                src={FileIcon}
                width={75}
                height={75}
                alt=""
            />

            <p>
                Lisää tiedostoja ja kuvia klikkaamalla, tai vetämällä ne tähän työpöydältäsi.
            </p>
        </div>
    );
}