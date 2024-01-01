'use client';

import IconLink from 'kotilogi-app/components/IconLink/IconLink';
import { usePropertyContext } from '../_util/PropertyContextProvider';
import style from '../layout.module.scss';
import Link from 'next/link';

export default function NavBar(){
    return (
        <nav className={style.sectionNav}>
            <IconLink imageSrc={'/icons/info.png'} href='info?section=general'>Tiedot</IconLink>
            <IconLink imageSrc={'/icons/history.png'} href="events">Tapahtumat</IconLink>
            <IconLink imageSrc={'/icons/bolt.png'} href="usage?data=heat">Kulutustiedot</IconLink>
            <IconLink imageSrc={'/icons/image.png'} href="images">Kuvat</IconLink>
            <IconLink imageSrc={'/icons/copy.png'} href="files">Tiedostot</IconLink>

            <Link href={`/properties/`}>Takaisin Taloihin</Link>
        </nav>
    );
}