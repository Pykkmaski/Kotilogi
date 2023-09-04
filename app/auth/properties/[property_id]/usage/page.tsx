import db from 'kotilogi-app/dbconfig';
import styles from './page.module.scss';
import {serverGetDataById} from 'kotilogi-app/actions/serverGetData';
import { getServerSession } from 'next-auth';
import { PropertyType } from 'kotilogi-app/types/PropertyType';
import { throwErrorIfNull } from 'kotilogi-app/utils/throwErrorIfNull';

export async function getServerSideProps(){
    const session = await getServerSession();
    return {
        props: {session}
    }
}

export default async function UsagePage({params}){
    const property = await serverGetDataById(params.property_id, 'properties') as PropertyType | null;
    throwErrorIfNull(property, 'Talon lataaminen epäonnistui!');
    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>{property!.address}</h1>
                <small>Kulutustiedot</small>
            </div>
        </div>  
    )
}