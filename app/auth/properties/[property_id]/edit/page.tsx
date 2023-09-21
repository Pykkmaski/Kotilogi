import styles from './page.module.scss';
import {serverGetDataById} from 'kotilogi-app/actions/serverGetData';
import InfoForm from './InfoForm';
import { throwErrorIfNull } from 'kotilogi-app/utils/throwErrorIfNull';

export default async function InfoEditPage({params}){
    const property = await serverGetDataById(params.property_id, 'properties') as Kotilogi.PropertyType | null;
    throwErrorIfNull(property, 'Talon lataaminen epäonnistui!');

    return (
        <div className={styles.container}>
            <div className={styles.header}>
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