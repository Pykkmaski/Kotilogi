import NavBar from "kotilogi-app/components/NavBar/NavBar";
import Page from "kotilogi-app/components/Page/Page";
import db from "kotilogi-app/dbconfig";
import Link from "next/link";

export default async function EventPageLayout({params, children}){

    const {refId: propertyId, title} = await db('propertyEvents').where({id: params.event_id}).select('refId', 'title').first();

    const headerContent = (
        <>
            <NavBar id="main-navbar">
                <Link href="info">Tiedot</Link>
                <Link href="images">Kuvat</Link>
                <Link href="files">Tiedostot</Link>
                <Link href={`/auth/properties/${propertyId}/events`}>Takaisin Taloon</Link>
            </NavBar>
            
        </>
        
    );

    return (
        <Page headerContent={headerContent}>
            <h1>{title}</h1>
            {children}
        </Page>
    )
}