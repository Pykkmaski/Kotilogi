import NavBar from "kotilogi-app/components/NavBar/NavBar";
import Page from "kotilogi-app/components/Page/Page";
import Link from "next/link";

export default function PropertiesLayout({children}){
    const headerContent = (
        <NavBar>
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
            {children}
        </Page>
    );
}