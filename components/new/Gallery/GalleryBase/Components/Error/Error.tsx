import { StaticImageData } from 'next/image';
import styles from './error.module.scss';
import Image from 'next/image';
import { Heading } from 'kotilogi-app/components/Heading/Heading';

export function Error(props: {
    title: string,
    message: string,
    icon: string,
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
            <Heading className={styles.errorTitle}>{props.title}</Heading>
            <p  className={styles.errorMessage}>
                {props.message}
            </p>
        </div>
    )
}