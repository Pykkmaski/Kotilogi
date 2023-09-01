import getPropertyById from "kotilogi-app/actions/getPropertyById";
import styles from './page.module.scss';

export default async function InfoPage({params}){
    const property: undefined | Property = await getPropertyById(params.property_id);

    return (
        <div className={styles.container}>
            <div className={styles.overview}>
                <span className={styles.address}>{property?.address}</span>
                <small>{property?.owner}</small>
            </div>
        </div>
    )
}