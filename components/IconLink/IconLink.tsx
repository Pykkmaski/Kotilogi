import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import style from './style.module.scss';

export default function IconLink(props: {
    imageSrc: string | StaticImageData,
    href: string,
    target?: string,
} & {
    children: React.ReactNode,
}){
    return (
        <Link href={props.href} target={props.target} className={style.container}>
            <Image
                src={props.imageSrc}
                alt="Link Icon"
            />
           {props.children}
        </Link>
    );
}