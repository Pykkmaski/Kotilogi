import db from 'kotilogi-app/dbconfig';
import styles from './page.module.scss';
import getPropertyById from 'kotilogi-app/actions/getPropertyById';
import { getServerSession } from 'next-auth';

export async function getServerSideProps(){
    const session = await getServerSession();
    return {
        props: {session}
    }
}

export default async function UsagePage({params}){
    const property = await getPropertyById(params.property_id);
    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>{property.address}</h1>
                <small>Kulutustiedot</small>
            </div>
        </div>  
    )
}