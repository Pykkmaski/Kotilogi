import NavBar from "kotilogi-app/components/NavBar/NavBar";
import NavSelector from "kotilogi-app/components/NavSelector/NavSelector";
import Page from "kotilogi-app/components/Page/Page";
import db from "kotilogi-app/dbconfig";
import Link from "next/link";
import style from './layout.module.scss';

function DesktopLinks(){
    return (
        <>
            <Link href="info">Tiedot</Link>
            <Link href="events">Tapahtumat</Link>
            <Link href="usage">Kulutustiedot</Link>
            <Link href="images">Kuvat</Link>
            <Link href="files">Tiedostot</Link>
            <Link href="/auth/properties">Takaisin Taloihin</Link>
        </>
    );
}

export default async function PropertiesLayout({params, children}){
    const {title: address} = await db('properties').where({id: params.property_id}).select('title').first();
    
    const headerContent = (
        <>
            <NavBar id={style.mainNavBar}>
                <DesktopLinks/>
            </NavBar>

            {/**Display this on mobile devices */}
            <NavSelector id={style.mainNavSelector}>
                <NavSelector.Option href="info">Tiedot</NavSelector.Option>
                <NavSelector.Option href="events">Tapahtumat</NavSelector.Option>
                <NavSelector.Option href="usage">Kulutustiedot</NavSelector.Option>
                <NavSelector.Option href="images">Kuvat</NavSelector.Option>
                <NavSelector.Option href="files">Tiedostot</NavSelector.Option>
                <NavSelector.Option href="/auth/properties">Takaisin Taloihin</NavSelector.Option>
            </NavSelector>
        </>
    );

    return (
        <Page headerContent={headerContent}>
            <h1>{address}</h1>
            {children}
        </Page>
    );
}