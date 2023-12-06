'use client';

import IconLink from 'kotilogi-app/components/IconLink/IconLink';
import { usePropertyContext } from '../_util/PropertyContextProvider';
import style from '../layout.module.scss';
import Link from 'next/link';
import InfoIcon from '@/assets/info.png';
import eventIcon from '@/assets/history.png';
import usageIcon from '@/assets/bolt.png';
import imageIcon from '@/assets/image.png';
import fileIcon from '@/assets/copy.png';

export default function NavBar(){
    return (
        <nav className={style.sectionNav}>
            <IconLink imageSrc={InfoIcon} href='info?section=general'>Tiedot</IconLink>
            <IconLink imageSrc={eventIcon} href="events">Tapahtumat</IconLink>
            <IconLink imageSrc={usageIcon} href="usage?data=heating">Kulutustiedot</IconLink>
            <IconLink imageSrc={imageIcon} href="images">Kuvat</IconLink>
            <IconLink imageSrc={fileIcon} href="files">Tiedostot</IconLink>

            <Link href={`/auth/properties/`}>Takaisin Taloihin</Link>
        </nav>
    );
}