import NavBar from "kotilogi-app/components/NavBar/NavBar";
import Page from "kotilogi-app/components/Page/Page";
import db from "kotilogi-app/dbconfig";
import Link from "next/link";

export default async function PropertiesLayout({params, children}){
    const {title: address} = await db('properties').where({id: params.property_id}).select('title').first();
    
    const headerContent = (
        <NavBar id="main-navbar">
            <Link href="info">Tiedot</Link>
            <Link href="events">Tapahtumat</Link>
            <Link href="usage">Kulutustiedot</Link>
            <Link href="images">Kuvat</Link>
            <Link href="files">Tiedostot</Link>
            <Link href="/auth/properties">Takaisin Taloihin</Link>
        </NavBar>
    );

    return (
        <Page headerContent={headerContent}>
            <h1>{address}</h1>
            {children}
        </Page>
    );
}