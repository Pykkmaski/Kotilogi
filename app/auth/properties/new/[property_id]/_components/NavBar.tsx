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
import UserIcon from '@/assets/user.png';

export default function NavBar(){
    return (
        <nav className={style.sectionNav}>
            <IconLink imageSrc={InfoIcon} href='info?section=general'>Tiedot</IconLink>
            <IconLink imageSrc={eventIcon} href="events?page=0">Tapahtumat</IconLink>
            <IconLink imageSrc={usageIcon} href="usage?data=heat&page=0">Kulutustiedot</IconLink>
            <IconLink imageSrc={imageIcon} href="images?page=0">Kuvat</IconLink>
            <IconLink imageSrc={fileIcon} href="files?page=0">Tiedostot</IconLink>
            <IconLink imageSrc={UserIcon} href="transfer">Omistajuus</IconLink>

            <Link href={`/auth/properties/`}>Takaisin Taloihin</Link>
        </nav>
    );
}