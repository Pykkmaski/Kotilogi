import { SplitScreen } from "kotilogi-app/components/SplitScreen/SplitScreen";
import Link from "next/link"
import { CSSProperties } from "react"

function Header(){
    const headerStyle: CSSProperties = {
        width: '100%',
        height: '100%',
        padding: '0.5rem',
        display: 'flex',
        borderBottom: '1px solid #DDD',
    }

    return (
        <div style={headerStyle}>
            <h2>Tili</h2>
        </div>
    );
}

function NavBar(){
    const navStyle: CSSProperties = {
        display: 'flex',
        flexFlow: 'column',
        borderRight: '1px solid #DDD',
        flex: 1,
        height: '100%',
    }

    return(
        <nav style={navStyle}>
            <Link href="overview">Yleisnäkymä</Link>
            <Link href="properties">Talot</Link>
            <Link href="settings">Asetukset</Link>
        </nav>
    );
}

function BodyArea({children}){
    const bodyStyle: CSSProperties = {
        paddingLeft: '1rem',
    }

    return (
        <div style={bodyStyle}>
            {children}
        </div>
    );
}

export default async function Layout({children}){
    const layoutStyle: CSSProperties = {
        display: 'flex',
        flexFlow: 'column',
        height: '100%',
        width: '100%',
        flex: 1,
        margin: 0,
        padding: '0 12vw 0 12vw',
    }

    return (
        <div style={layoutStyle}>
            <Header/>
            <SplitScreen rightWeight={7}>
                <NavBar/>
                <BodyArea>
                    {children}
                </BodyArea>
            </SplitScreen>
        </div>
    );
}