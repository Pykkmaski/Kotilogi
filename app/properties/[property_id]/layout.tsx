import Link from 'next/link';
import styles from './layout.module.scss';

import PropertyProvider from 'kotilogi-app/contexts/PropertyProvider';
import db from 'kotilogi-app/dbconfig';
import MobileNavMenu from './_components/MobileNavMenu';

function NavBar(props){
    return (
        <>
            {/*Desktop devices*/}
            <nav className={styles.navbar}>
                <Link href="info">Tiedot</Link>
                <Link href="events">Tapahtumat</Link>
                <Link href="usage">Kulutus</Link>
                <Link href="images">Kuvat</Link>
                <Link href="files">Tiedostot</Link>
            </nav>
        </>
    )
}

export default async function PropertyLayout({params, children}){
    const property = await db('properties').where({id: params.property_id}).first();

    return (
        <div className={styles.container}>
            <NavBar/>
            <PropertyProvider property={property}>
                {children}  
            </PropertyProvider>
            {/**Mobile devices */}
            <MobileNavMenu/>
        </div>
    );
}