'use client';

import GalleryBase from 'kotilogi-app/components/new/Gallery/GalleryBase/GalleryBase';
import { useSearchParams } from 'next/navigation';
import style from './style.module.scss';
import Link from 'next/link';
import AddModal from 'kotilogi-app/components/new/Gallery/UsageGallery/AddModal';
import UsageGallery from 'kotilogi-app/components/new/Gallery/UsageGallery/UsageGallery';

export default async function UsagePage({params}){

    const searchParams = useSearchParams();
    const section = searchParams.get('data');

    return (
        <>
            <div className={style.header}>
                <nav className="overhead">
                    <Link href="?data=heating">Lämmitys</Link>
                    <Link href="?data=water">Vesi</Link>
                    <Link href="?data=electric">Sähkö</Link>
                </nav>
            </div>
            <UsageGallery type={section as any} propertyId={params.property_id}/>
        </>
    );
}