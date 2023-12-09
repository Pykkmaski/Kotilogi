import { StaticImageData } from "next/image";
import Image from 'next/image';
import style from './style.module.scss';
import Link from "next/link";

export default function FileItemComponent(props: {
    item: {
        fileName: string,
    },
    imageSrc?: string | StaticImageData,

    /**
     * The link to the file. Used when clicking on the component.
     */
    destination: string,
}){
    
    return (
        <Link className={style.item} href={props.destination} target="_blank">
            <div>
                {
                    props.imageSrc ? 
                    <Image
                        width={50}
                        height={50}
                        alt=""
                        src={props.imageSrc}
                    />
                    :
                    null
                }
                
                <span>{props.item.fileName}</span>
            </div>
        </Link>
    );
}