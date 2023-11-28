import Link from 'next/link';
import style from './sidebar.module.scss';
import {Logo} from 'kotilogi-app/app/_Header/Header';


export default function SideBar(){
    return (
        <section className={style.sidebar}>
            <Logo/>
            <nav>
                <Link href="info">Tiedot</Link>
                <Link href="events">Tapahtumat</Link>
            </nav>
        </section>
    );
}