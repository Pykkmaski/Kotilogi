import { StaticImageData } from 'next/image';
import styles from './error.module.scss';
import Image from 'next/image';

export default function Error(props: {
    title: string,
    message: string,
    icon: string | StaticImageData,
}){

    return (
        <div className={styles.errorContainer}>
            <Image 
                src={props.icon} 
                className={styles.errorImage} 
                width={70} 
                height={70} 
                alt="Error Image"
            />
            <h2 className={styles.errorTitle}>{props.title}</h2>
            <p  className={styles.errorMessage}>
                {props.message}
            </p>
        </div>
    )
}