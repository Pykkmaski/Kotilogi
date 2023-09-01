import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import styles from './component.module.scss';

type IconLinkProps = {
    imageSrc: string | StaticImageData,
    href: string,
    target?: string,
    children?: React.ReactNode,
}

export default function IconLink(props: IconLinkProps){
    return (
        <Link href={props.href} target={props.target} className={styles.container}>
            <Image
                src={props.imageSrc}
                alt="Link Icon"
            />
           {props.children}
        </Link>
    );
}