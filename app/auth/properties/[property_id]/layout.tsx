import IconLink from './_components/IconLink/IconLink';
import Link from 'next/link';
import styles from './layout.module.scss';

import InfoIcon from 'kotilogi-app/assets/info.png';
import UsageIcon from 'kotilogi-app/assets/bolt.png';
import EventsIcon from 'kotilogi-app/assets/history.png'
import FilesIcon from 'kotilogi-app/assets/copy.png';
import ImagesIcon from 'kotilogi-app/assets/image.png';
import HouseIcon from 'kotilogi-app/assets/house.png';

import MobileNavMenu from './_components/MobileNavMenu';

function NavBar(props){
    return (
        <>
            {/*Desktop devices*/}
            <nav className={styles.navbar}>
                <span className={styles.title}>Osiot</span>
                <IconLink href="info" imageSrc={InfoIcon}>Tiedot</IconLink>
                <IconLink href="usage" imageSrc={UsageIcon}>Kulutus</IconLink>
                <IconLink href="events" imageSrc={EventsIcon}>Tapahtumat</IconLink>
                <IconLink href="images" imageSrc={ImagesIcon}>Kuvat</IconLink>
                <IconLink href="files" imageSrc={FilesIcon}>Tiedostot</IconLink>
                
                <span className={styles.title}>Muut</span>
                <IconLink href="/auth/properties" imageSrc={HouseIcon}>Takaisin Taloihin</IconLink>
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