import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import style from './style.module.scss';

export default function IconLink(props: React.ComponentProps<'a'> & {
    imageSrc: string | StaticImageData,
    href: string,
}){
    return (
        <Link href={props.href} target={props.target} className={style.container}>
            <Image
                src={props.imageSrc}
                alt="Link Icon"
                width={15}
                height={15}
            />
           {props.children}
        </Link>
    );
}