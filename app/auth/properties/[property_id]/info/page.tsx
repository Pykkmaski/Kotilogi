import { serverGetDataById } from 'kotilogi-app/actions/serverGetData';
import styles from './page.module.scss';
import Link from 'next/link';
import EditForm from './_Components/DBColumn/Components/EditForm/EditForm';
import Page from 'kotilogi-app/components/Page/Page';

type EntryProps = {
    label: string,
    value: any,
}

export default async function InfoPage({params}){
    const property = await serverGetDataById(params.property_id, 'properties') as Kotilogi.PropertyType | null;
    if(!property) throw new Error('Talon lataaminen epäonnistui!');

    const headerContent = (
        <div className={styles.titleContainer}>
            <small>{property?.refId}</small>
            <p>
                {property!.description}
            </p>
        </div>
    );

    return (
        <>
            {headerContent}
            <EditForm property={property}/>
        </>
    );
}