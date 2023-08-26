import { StaticImageData } from 'next/image';
import styles from './error.module.scss';
import Image from 'next/image';


type ErrorProps = {
    title: string,
    imageUrl: string | StaticImageData,
    message?: string,
}

export default function Error({title, message, imageUrl}: ErrorProps){
    return (
        <div className="error-no-files">
            <Image src={imageUrl} className={styles.errorImage} width={70} height={70} alt="Error Image"/>
            <h2 className={styles.errorTitle}>{title}</h2>
            <p className={styles.errorMessage}>{message}</p>
        </div>
    )
}