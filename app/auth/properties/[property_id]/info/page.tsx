import Form from 'kotilogi-app/components/Form';
import styles from './page.module.scss';
import getPropertyById from 'kotilogi-app/actions/getPropertyById';
import { FormField } from 'kotilogi-app/components/Gallery/Types';
import InfoForm from './InfoForm';

export default async function PropertyInfoPage({params}){
    const property = await getPropertyById(params.property_id);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>{property.address}</h1>
                <small>Tiedot</small>
            </div>

            <div className={styles.body}>
                <div className={styles.summary} hidden={true}>
                    <div className={styles.bgImage}/>
                    <div className={styles.descriptionArea}>{property.description}</div>
                </div>
                <InfoForm property={property}/>
            </div>
        </div>
    );
}