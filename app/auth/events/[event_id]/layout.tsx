import NavBar from "kotilogi-app/components/NavBar/NavBar";
import NavSelector from "kotilogi-app/components/NavSelector/NavSelector";
import Page from "kotilogi-app/components/Page/Page";
import db from "kotilogi-app/dbconfig";
import Link from "next/link";
import style from './layout.module.scss';

export default async function EventPageLayout({params, children}){

    const {refId: propertyId, title} = await db('propertyEvents').where({id: params.event_id}).select('refId', 'title').first();
    const {title: address} = await db('properties').where({id: propertyId}).first().select('title');

    const headerContent = (
        <>
            <NavBar id="main-navbar">
                <Link href="info">Tiedot</Link>
                <Link href="images">Kuvat</Link>
                <Link href="files">Tiedostot</Link>
                <Link href={`/auth/properties/${propertyId}/events`}>Takaisin Tapahtumiin</Link>
            </NavBar>

            {/**Display this on mobile devices */}
            <NavSelector id="event-main-nav-selector">
                <Link href="info">Tiedot</Link>
                <Link href="images">Kuvat</Link>
                <Link href="files">Tiedostot</Link>
                <Link href={`/auth/properties/${propertyId}/events`}>Takaisin Tapahtumiin</Link>
            </NavSelector>
        </>
    );
    
    return (
        <Page headerContent={headerContent}>
            <h1>
                <span className={style.address}>{address}</span> - {title}
            </h1>
            {children}
        </Page>
    )
}