import Link from 'next/link';
import './styles.scss';
import PropertyProvider from 'kotilogi-app/contexts/PropertyProvider';
import db from 'kotilogi-app/dbconfig';

function NavBar(props){
    return (
        <>
            {/*Desktop devices*/}
            <nav className="property-navbar">
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
    //Which property do I load?
    const property = await db('properties').where({id: params.property_id}).first();

    return (
        <div className="property-page-layout">
            <NavBar/>
            <PropertyProvider property={property}>
                {children}  
            </PropertyProvider>
        </div>
    );
}