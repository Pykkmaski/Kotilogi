'use client';

import {PrimaryButton} from "kotilogi-app/components/Button/PrimaryButton";
import {SecondaryButton} from "kotilogi-app/components/Button/SecondaryButton";
import { ContentCard } from "kotilogi-app/components/RoundedBox/RoundedBox";
import { Input, Select } from "kotilogi-app/components/Input/Input";
import { useInputData } from "kotilogi-app/components/Modals/BaseAddModal.hooks";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { UsageColumnChart } from "kotilogi-app/components/Experimental/Chart/Chart";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { usePropertyContext } from "../_util/PropertyContextProvider";
import { UsagePieChart } from "@/components/UsagePage/PieChart";
import { colors } from "kotilogi-app/apex.config";
import { UsageDataCategorized } from "@/components/UsagePage/UsageDataCategorized";
import { TotalPrice } from "@/components/UsagePage/TotalPrice";
import { AllUsageDataChart } from "@/components/UsagePage/AllUsageDataChart";
import { DateRangeSelector } from "@/components/DateRangeSelector/DateRangeSelector";
import * as usage from '@/actions/usage';
import { DataList } from "@/components/UsagePage/DataList";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/UsagePage/Icon";

function AddUsageModal(props: ModalProps){
    const {property} = usePropertyContext();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const type = searchParams.get('type') as Kotilogi.UsageTypeType | 'all';

    const initialData = {refId: property.id, type: type !== 'all' ? type : 'heat'};
    const {updateData, data, reset: resetInputData} = useInputData(initialData);
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const formRef = useRef<HTMLFormElement | null>(null);

    const formId = `${props.id}-form`;

    const loading = status === 'loading';

    const closeModal = () => {
        formRef.current?.reset();
        resetInputData(initialData);
        props.onHide();
    }

    const submitUsageData = (e) => {
        e.preventDefault();
        setStatus('loading');
        
        const dataToAdd = {
            ...data,
            type: type !== 'all' ? type : e.target.type.value,
        }

        usage.add(dataToAdd)
        .then(() => {
            //Route to the same year as the year of the newly added data.
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.set('year', new Date(dataToAdd.time).getFullYear().toString());
            const url = `${pathName}?${newSearchParams.toString()}`;
            router.replace(url);
        })
        .catch(err => {
            if(err.message === 'invalid_date'){
                toast.error('Tiedon päiväys ei voi olla tulevaisuudessa!');
            }
            else{
                toast.error('Tuntematon virhe!');
            }
        })
        .finally(() => {
            closeModal();
            setStatus('idle');

            
        });
    }

    return (
        <Modal {...props}>
            <Modal.Header> 
                <div className="w-full flex gap-2 items-center">
                    {type !== 'all' ? <Icon type={type} /> : null }
                    <span>Lisää Kulutustieto</span>
                </div>
                
            </Modal.Header>
            <Modal.Body>
                <form id={formId} onSubmit={submitUsageData} className="flex flex-col gap-4" ref={formRef}>
                    {
                        type === 'all' ? (
                            <Select
                                label="Tyyppi"
                                description="Kulutustiedon tyyppi."
                                name="type"
                                required={true}
                                onChange={(e) => {
                                    updateData(e);
                                }}>
                                    <option value="heat" selected={true}>Lämmityskulu</option>
                                    <option value="water">Vesikulu</option>
                                    <option value="electric">Sähkökulu</option>
                            </Select>
                        )
                        :
                        null
                    }
                    
                    <Input 
                        name="price"
                        label="Laskun Hinta" 
                        description="Laskun hinta euroissa."
                        onChange={updateData}
                        placeholder="Kirjoita laskun hinta..."
                        type="number"
                        required
                        />

                    <Input
                        name="time"
                        label="Laskun päiväys"
                        description="Laskun päivämäärä."
                        placeholder="Kirjoita laskun päivämäärä..."
                        onChange={updateData}
                        type="date"
                        required/>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <div className="flex gap-4">
                    <SecondaryButton onClick={closeModal} type="button">Peruuta</SecondaryButton>
                    <PrimaryButton type="submit" loading={loading} disabled={loading} form={formId}>Lisää</PrimaryButton>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

type ControlsProps = {
    timestamps: {time: string}[],
    currentYear: string,
}

export function Controls({timestamps, currentYear}: ControlsProps){
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
                <span className="text-slate-500">Suodata:</span>
                <DateRangeSelector timestamps={timestamps} currentYear={currentYear}/>
            </div>

            <AddUsageModal 
                show={showAddModal} 
                onHide={() => setShowAddModal(false)} 
                id="add-usage-modal"/>

            <PrimaryButton onClick={() => setShowAddModal(true)}>
                <img className="aspect-square w-[25px] invert" src="/icons/plus.png"/>
            </PrimaryButton>
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
        <div className="flex gap-2 w-full max-h-full">
            <div className="flex-[1]">
                <ContentCard title="Yhteenveto">
                    <div className="flex flex-col gap-2">
                        {getChart()}
                        
                        <div className="flex-1 flex justify-center items-center">
                            <TotalPrice data={data}/>
                            <div className="flex justify-center items-center relative">
                                <UsagePieChart data={data}/>
                                <div className="absolute text-2xl text-slate-500">
                                    {year}
                                </div>
                            </div>

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