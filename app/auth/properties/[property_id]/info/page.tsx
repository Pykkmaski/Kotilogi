import { serverGetDataById } from 'kotilogi-app/actions/serverGetData';
import styles from './page.module.scss';
import Link from 'next/link';
import EditForm from './_Components/DBColumn/Components/EditForm/EditForm';

type EntryProps = {
    label: string,
    value: any,
}

export default async function InfoPage({params}){
    const property = await serverGetDataById(params.property_id, 'properties') as Kotilogi.PropertyType | null;
    if(!property) throw new Error('Talon lataaminen epäonnistui!');

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <div className={styles.titleContainer} style={undefined}>
                    <small>{property?.refId}</small>
                    <p>
                        {property!.description}
                    </p>
                </div>

                <EditForm property={property}/>
            </div>
            
        </div>
    );
}