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
    const type = searchParams.type as 'heat' | 'water' | 'electric' | 'all';
    const year = searchParams.year;

    var usageQuery = type === 'all' ? {
        refId: params.property_id,
    }
    : {
        refId: params.property_id,
        type,
    }

    const [allData, [property]] = await Promise.all([
        usage.getByYear(parseInt(year), usageQuery), 
        database.get<Partial<Kotilogi.PropertyType>>('properties', {id: params.property_id})
    ]);

    if(!allData || !property) throw new Error('Kulutustietojen lataus epäonnistui!');

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
        
                <Controls property={property}/>
            </div> 
            <PageContent allData={allData} property={property} year={year} type={type}/>
        </main>
    );
}