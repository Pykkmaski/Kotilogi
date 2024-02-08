import db from 'kotilogi-app/dbconfig';
import { Content } from './page.components';
import { UsagePieChart } from '@/components/UsagePage/PieChart';
import { ContentCard } from '@/components/RoundedBox/RoundedBox';
import { Group } from '@/components/Group';

async function getUsageData(propertyId: string, type?: 'heat' | 'water' | 'electric'){
    return new Promise<Record<string, string>[] | undefined>(async (resolve, reject) => {
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
    const type = searchParams.type as 'heat' | 'water' | 'electric';
    const dataByType = await getUsageData(params.property_id, type);
    const allData = await getUsageData(params.property_id);

    if(!dataByType || !allData) throw new Error('Kulutustietojen lataus epäonnistui!');

    return (    
        <main>
            <Group direction="col" gap={4}>
                <Content data={dataByType} type={type} />
                <div className="w-full">
                    <ContentCard title="Yleiskatsaus">
                        <div className="w-[500px]">
                            <UsagePieChart data={allData}/>
                        </div>
                    </ContentCard>
                </div>
            </Group>
        </main>
    );
}