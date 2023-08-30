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
                <span className={styles.title}>Osiot</span>
                <Link href="info">Tiedot</Link>
                <Link href="usage">Kulutus</Link>
                <Link href="events">Tapahtumat</Link>
                <Link href="images">Kuvat</Link>
                <Link href="files">Tiedostot</Link>
                
                <span className={styles.title}>Muut</span>
                <Link href="/auth/properties">Takaisin Taloihin</Link>
            </nav>
        </>
    )
}

export default async function PropertyLayout({params, children}){
    return (
        <div className={styles.container}>
            <NavBar/>
                {children}  
            {/**Mobile devices */}
            <MobileNavMenu/>
        </div>
    );
}