import style from '../layout.module.scss';
import Link from 'next/link';

export default function NavBar(){
    return (
        <nav className={style.sectionNav}>
            <Link href="images">Kuvat</Link>
            <Link href="files">Tiedostot</Link>
        </nav>
    );
}