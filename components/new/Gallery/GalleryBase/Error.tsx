import { StaticImageData } from 'next/image';
import styles from './error.module.scss';
import Image from 'next/image';
import HistoryIcon from '@/assets/history.png';
import ImageIcon from '@/assets/image.png';
import FileIcon from '@/assets/copy.png';
import HouseIcon from '@/assets/house.png';
import BoltIcon from '@/assets/bolt.png';
import useGalleryContext from './GalleryContext';

export default function Error(){
    const {props: {contentType, query, tableName}} = useGalleryContext();

    const attributes = (
        contentType === 'image' ? {
            errorImage: ImageIcon,
            title: 'Ei Kuvia',
            message: 'Et ole vielä lisännyt kuvia. Aloita painamalla ylänurkassa näkyvää Lisää Uusi-painiketta.'
        }
        :
        contentType === 'file' ? {
            errorImage: FileIcon,
            title: 'Ei Tiedostoja',
            message: 'Et ole vielä lisännyt tiedostoja. Aloita painamalla ylänurkassa näkyvää Lisää Uusi-painiketta.',
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
        //The table must be a usage tabl. The table has different data based on the query object passed. Determine message based on that.
        query.type === 'heating' ?
        {
            errorImage: BoltIcon,
            title: 'Ei Lämmityskulutietoja',
            message: 'Et ole vielä lisännyt talolle lämmityskulutietoja. Aloita painamalla yläreunassa olevaa Lisää Uusi-painiketta.'
        }
        :
        query.type === 'water' ? 
        {
            errorImage: BoltIcon,
            title: 'Ei Vesikulutietoja',
            message: 'Et ole vielä lisännyt talolle vesikulutietoja. Aloita painamalla yläreunassa olevaa Lisää Uusi-painiketta.'
        }
        :
        {
            errorImage: BoltIcon,
            title: 'Ei Sähkökulutietoja',
            message: 'Et ole vielä lisännyt talolle sähkökulutietoja. Aloita painamalla yläreunassa olevaa Lisää Uusi-painiketta.'
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