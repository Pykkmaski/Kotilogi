import styles from './page.module.scss';
import {serverGetDataById} from 'kotilogi-app/actions/serverGetData';
import InfoForm from './InfoForm';
import { PropertyType } from 'kotilogi-app/types/PropertyType';
import { throwErrorIfNull } from 'kotilogi-app/utils/throwErrorIfNull';

export default async function InfoEditPage({params}){
    const property = await serverGetDataById(params.property_id, 'properties') as PropertyType | null;
    throwErrorIfNull(property, 'Talon lataaminen epäonnistui!');

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>{property?.address}</h1>
                <small>Tiedot</small>
            </div>

            <div className={styles.body}>
                <div className={styles.summary} hidden={true}>
                    <div className={styles.bgImage}/>
                    <div className={styles.descriptionArea}>{property?.description}</div>
                </div>
                <InfoForm property={property}/>
            </div>
        </div>
    );
}