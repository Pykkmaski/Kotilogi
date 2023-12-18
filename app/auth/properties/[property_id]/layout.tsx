import {NavBar} from "kotilogi-app/components/NavBar/NavBar";
import NavSelector from "kotilogi-app/components/NavSelector/NavSelector";
import SelectorLink from "kotilogi-app/components/NavSelector/Components/SelectorWindow/Components/SelectorLink/SelectorLink";
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
            <NavBar id={style.mainNavBar} >
                <DesktopLinks/>
            </NavBar>

            {/**Display this on mobile devices */}
            <NavSelector id={style.mainNavSelector}>
                <SelectorLink href="info" text="Tiedot"/>
                <SelectorLink href="events" text="Tapahtumat"/>
                <SelectorLink href="usage" text="Kulutustiedot"/>
                <SelectorLink href="images" text="Kuvat"/>
                <SelectorLink href="files" text="Tiedostot"/>
                <SelectorLink href="/auth/properties" text="Takaisin Taloihin"/>
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