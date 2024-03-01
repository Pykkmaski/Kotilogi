import db from 'kotilogi-app/dbconfig';
import { Controls, PageContent } from './page.components';
import * as database from '@/actions/database';
import * as usage from '@/actions/usage';

import Link from 'next/link';
import { TypeNav } from '@/components/UsagePage/TypeNav';

async function getUsageData(propertyId: string, type?: 'heat' | 'water' | 'electric'){
    return new Promise<Kotilogi.UsageType[] | undefined>(async (resolve, reject) => {
        try{
            const data = (
                type ? await db('usage').where({type, refId: propertyId})
                :
                await db('usage').where({refId: propertyId})
            );

            resolve(data);
        }
        catch(err){
            reject(err);
        }
    });
}

export default async function UsagePage({params, searchParams}){
    const type = searchParams.type as Kotilogi.UsageTypeType | 'all';
    const year = searchParams.year as string | undefined;

    var usageQuery = type === 'all' ? {
        refId: params.property_id,
    }
    : {
        refId: params.property_id,
        type,
    }

    //Get the data for the selected year, and the timestamps for all data, to render the year selector.
    const [data, timestamps] = await Promise.all([
        usage.get(usageQuery, year || 'all'),
        db('usage').select('time'),
    ]);

    if(!data || !timestamps) throw new Error('Kulutustietojen lataus epäonnistui!');

    data.sort((a, b) => {
        const timeA = new Date(a.time).getTime();
        const timeB = new Date(b.time).getTime();

        return timeA - timeB;
    });

    var displayYear = 'all';
    if(data.length){
        displayYear = new Date(data.at(-1).time).getFullYear().toString();
    }

    return (   
        <main className="w-full mb-10 flex flex-col gap-4">
            {/**The page header */}
            <div className="w-full flex bg-white justify-between gap-4 sticky top-0 z-40">
                <div className="flex gap-4 items-center">
                    <h1 className="text-lg text-slate-500 mr-4">Kulutustiedot</h1>
                    <TypeNav>
                        <Link href={`?type=all&year=${year}`}>Kaikki</Link>
                        <Link href={`?type=heat&year=${year}`}>Lämmitys</Link>
                        <Link href={`?type=water&year=${year}`}>Vesi</Link>
                        <Link href={`?type=electric&year=${year}`}>Sähkö</Link>
                    </TypeNav>
                </div>
        
                <Controls timestamps={timestamps} currentYear={displayYear}/>
            </div>

            <PageContent data={data} year={displayYear} type={type}/>
        </main>
    );
}