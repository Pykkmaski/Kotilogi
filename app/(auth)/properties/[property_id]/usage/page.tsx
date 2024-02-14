import db from 'kotilogi-app/dbconfig';
import { Content } from './page.components';
import { UsagePieChart } from '@/components/UsagePage/PieChart';
import { ContentCard, RoundedBox } from '@/components/RoundedBox/RoundedBox';
import { Group } from '@/components/Group';
import { Overview } from '@/components/UsagePage/Overview';
import { BorderHeader } from '@/components/Header/Header';
import { BoxHeading } from '@/components/Heading';
import { SelectTimeSpanButton } from '@/components/UsagePage/SelectTimespanButton';
import { DateRangeSelector } from '@/components/DateRangeSelector/DateRangeSelector';
import { AllUsageDataChart } from '@/components/UsagePage/AllUsageDataChart';
import { TotalPrice } from '@/components/UsagePage/TotalPrice';
import { UsageDataCategorized } from '@/components/UsagePage/UsageDataCategorized';

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
    const [dataByType, allData] = await Promise.all([getUsageData(params.property_id, type), getUsageData(params.property_id)]);
    if(!dataByType || !allData) throw new Error('Kulutustietojen lataus epäonnistui!');

    return (    
        <main className="w-full mb-10">
            <div className="flex flex-col gap-4">
                <ContentCard title="Kulutustiedot">
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <AllUsageDataChart data={allData}/>
                        </div>
                        
                        <div className="flex-1 flex justify-center items-center">
                            <TotalPrice data={allData}/>
                            <div className="flex justify-center items-center relative">
                                <UsagePieChart data={allData}/>
                                <div className="absolute">
                                    {'<Valittu Vuosi>'}
                                </div>
                            </div>

                            <UsageDataCategorized data={allData}/>
                        </div>
                    </div>
                </ContentCard>
               
                
                <Content data={dataByType} type={type} />
            </div>
        </main>
    );
}