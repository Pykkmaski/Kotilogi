import db from 'kotilogi-app/dbconfig';
import { Content } from './page.components';
import { UsagePieChart } from '@/components/UsagePage/PieChart';
import { ContentCard, RoundedBox } from '@/components/RoundedBox/RoundedBox';
import { Group } from '@/components/Group';
import { Overview } from '@/components/UsagePage/Overview';
import { BorderHeader } from '@/components/Header/Header';
import { BoxHeading } from '@/components/Heading';
import { SelectTimeSpanButton } from '@/components/UsagePage/SelectTimespanButton';

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
    const type = searchParams.type as 'heat' | 'water' | 'electric';
    const dataByType = await getUsageData(params.property_id, type);
    const allData = await getUsageData(params.property_id);

    if(!dataByType || !allData) throw new Error('Kulutustietojen lataus epäonnistui!');

    return (    
        <main className="w-full mb-10">
            <Group direction="col" gap={4}>
                <Content data={dataByType} type={type} />

                <div className="w-full">
                    <RoundedBox>
                        <BorderHeader>
                            <div className="flex justify-between items-center w-full">
                                <BoxHeading>Yleiskatsaus</BoxHeading>
                                <div className="shadow-md">
                                    <SelectTimeSpanButton/>
                                </div>
                            </div>
                        </BorderHeader>

                        <Overview data={allData}/>
                    </RoundedBox>
                </div>
            </Group>
        </main>
    );
}