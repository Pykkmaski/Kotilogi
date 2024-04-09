'use client';

import { ContentCard } from "kotilogi-app/components/RoundedBox/RoundedBox";
import { useRef } from "react";
import { UsageColumnChart } from "kotilogi-app/components/Experimental/Chart/Chart";
import { UsagePieChart } from "@/components/UsagePage/PieChart";
import { colors } from "kotilogi-app/apex.config";
import { UsageDataCategorized } from "@/components/UsagePage/UsageDataCategorized";
import { TotalPrice } from "@/components/UsagePage/TotalPrice";
import { AllUsageDataChart } from "@/components/UsagePage/AllUsageDataChart";
import { DateRangeSelector } from "@/components/DateRangeSelector/DateRangeSelector";
import { DataList } from "@/components/UsagePage/DataList";
import {ModalRefType} from '@/components/Experimental/Modal/Modal';
import AddUsageModal from "./AddUsageModal";
import { AddButton } from "@/components/new/Gallery/GalleryBase/Buttons";

type ControlsProps = {
    timestamps: {time: string}[],
    currentYear: string,
}

export function Controls({timestamps, currentYear}: ControlsProps){
    const addModalRef = useRef<ModalRefType>(null);

    return (
        <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
                <span className="text-slate-500">Suodata:</span>
                <DateRangeSelector timestamps={timestamps} currentYear={currentYear}/>
            </div>

            <AddUsageModal ref={addModalRef}/>

            <AddButton onClick={() => addModalRef.current?.toggleOpen(true)}/>
        </div>
    );
}

function DataRing({data, year}){
    return (
        <div className="flex justify-center items-center relative">
            <UsagePieChart data={data}/>
            <div className="absolute text-2xl text-slate-500">
                {year}
            </div>
        </div>
    );
}

type PageContentProps = {
    data: Kotilogi.UsageType[],
    year: string,
    type: Kotilogi.UsageTypeType | 'all',
}

export function PageContent({data, year, type}: PageContentProps){
    const getChart = () => {
        if(type === 'all'){
            return <AllUsageDataChart data={data}/>
        }
        else {
            return <UsageColumnChart data={data} columnColor={colors[type]} options={{
                chart: {
                    width: '100%',
                },
                title: {
                    text: 'Kulutus',
                }
            }}/>
        }
    }

    return (
        <div className="flex xs:flex-col lg:flex-row gap-2 w-full max-h-full">
            <div className="flex-[1]">
                <ContentCard title="Yhteenveto">
                    <div className="flex flex-col gap-2">
                        {getChart()}
                        
                        <div className="flex-1 lg:flex xs:flex-col lg:flex-row justify-center items-center">
                            <TotalPrice data={data}/>
                            <DataRing data={data} year={year}/>
                            {
                                type === 'all' ? <UsageDataCategorized data={data}/> : null
                            }
                            
                        </div>
                    </div>
                </ContentCard>
            </div>
            
            <div className="flex-1 overflow-y-scroll max-h-[100%]">
                <ContentCard title="Tiedot">
                    <DataList data={data} />
                </ContentCard>
            </div>
        </div>
    )
}