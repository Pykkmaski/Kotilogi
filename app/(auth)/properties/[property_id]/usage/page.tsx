'use client';

import { useSearchParams } from 'next/navigation';
import style from './style.module.scss';
import Link from 'next/link';
import { Heading } from 'kotilogi-app/components/Heading/Heading';

export default async function UsagePage({params}){

    const searchParams = useSearchParams();
    const section = searchParams.get('data');

    return (
        <main>
            <Heading>Osio on työn alla...</Heading>
        </main>
    );
}