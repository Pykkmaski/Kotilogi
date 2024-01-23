import db from 'kotilogi-app/dbconfig';
import { Content } from './page.components';

async function getUsageData(type: 'heat' | 'water' | 'electric', propertyId: string){
    return new Promise<Record<string, string>[] | undefined>(async (resolve, reject) => {
        try{
            const data = await db('usage').where({type, refId: propertyId});
            resolve(data);
        }
        catch(err){
            reject(err);
        }
    });
}

export default async function UsagePage({params, searchParams}){
    const type = searchParams.type as 'heat' | 'water' | 'electric';
    const data = await getUsageData(type, params.property_id);

    if(!data) throw new Error('Kulutustietojen lataus epäonnistui!');

    return (    
        <main>
            <Content data={data} type={type} />
        </main>
    );
}