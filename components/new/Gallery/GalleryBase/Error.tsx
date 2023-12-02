import { StaticImageData } from 'next/image';
import styles from './error.module.scss';
import Image from 'next/image';
import HistoryIcon from '@/assets/history.png';
import ImageIcon from '@/assets/image.png';
import FileIcon from '@/assets/copy.png';
import HouseIcon from '@/assets/house.png';
import BoltIcon from '@/assets/bolt.png';
import useGalleryContext from './GalleryContext';
import { StyleRegistry } from 'styled-jsx';

type ErrorProps = {
    title: string,
}

export default function Error(){
    const {props: {contentType}, tableName} = useGalleryContext();

    const attributes = (
        contentType === 'image' ? {
            errorImage: ImageIcon,
            title: 'Ei Kuvia',
            message: 'Et ole vielä lisännyt kuvia.'
        }
        :
        contentType === 'file' ? {
            errorImage: FileIcon,
            title: 'Ei Tiedostoja',
            message: 'Et ole vielä lisännyt tiedostoja.'
        }
        :
        tableName === 'properties' ? {
            errorImage: HouseIcon,
            title: 'Ei Taloja',
            message: 'Et ole vielä lisännyt taloja. Aloita painamalla yläreunassa olevaa Lisää Uusi-painiketta.',
        } 
        :
        tableName === 'propertyEvents' ? 
        {
            errorImage: HistoryIcon,
            title: 'Ei Tapahtumia',
            message: 'Et ole vielä lisännyt talolle tapahtumia. Aloita painamalla yläreunassa olevaa Lisää Uusi-painiketta.'
        }
        :
        {
            errorImage: BoltIcon,
            title: 'Ei Kulutustietoja',
            message: 'Et ole vielä lisännyt talolle kulutustietoja. Aloita painamalla yläreunassa olevaa Lisää Uusi-painiketta.'
        }
    );

    return (
        <div className={styles.errorContainer}>
            <Image src={attributes.errorImage} className={styles.errorImage} width={70} height={70} alt="Error Image"/>
            <h2 className={styles.errorTitle}>{attributes.title}</h2>
            <p  className={styles.errorMessage}>
                {attributes.message}
            </p>
        </div>
    )
}