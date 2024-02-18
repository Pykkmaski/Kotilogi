'use client';

import {PrimaryButton} from "kotilogi-app/components/Button/PrimaryButton";
import {SecondaryButton} from "kotilogi-app/components/Button/SecondaryButton";
import { ContentCard, RoundedBox } from "kotilogi-app/components/RoundedBox/RoundedBox";
import { BorderHeader } from "kotilogi-app/components/Header/Header";
import { Input, Select } from "kotilogi-app/components/Input/Input";
import { useInputData } from "kotilogi-app/components/Modals/BaseAddModal.hooks";
import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BoxHeading } from "kotilogi-app/components/Heading";
import { Flex } from "kotilogi-app/components/Util/Flex";
import { Group } from "kotilogi-app/components/Group";
import { UsageColumnChart } from "kotilogi-app/components/Experimental/Chart/Chart";
import { deleteUsage } from "kotilogi-app/actions/usage/deleteUsage";
import { updateUsage } from "kotilogi-app/actions/usage/updateUsage";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { usePropertyContext } from "../_util/PropertyContextProvider";
import Link from "next/link";
import { TypeNav } from "@/components/UsagePage/TypeNav";
import { UsagePieChart } from "@/components/UsagePage/PieChart";
import { colors } from "kotilogi-app/apex.config";
import { UsageDataCategorized } from "@/components/UsagePage/UsageDataCategorized";
import { TotalPrice } from "@/components/UsagePage/TotalPrice";
import { AllUsageDataChart } from "@/components/UsagePage/AllUsageDataChart";
import { DateRangeSelector } from "@/components/DateRangeSelector/DateRangeSelector";
import * as usage from '@/actions/usage';
import { DataList } from "@/components/UsagePage/DataList";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/UsagePage/Icon";

function AddUsageModal(props: ModalProps){
    const {property} = usePropertyContext();
    const searchParams = useSearchParams();
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

    const submitUsageData = (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        
        usage.add(data)
        .then(() => {
            closeModal();
        })
        .catch(err => toast.error('Tiedon lisääminen epäonnistui!'))
        .finally(() => setStatus('idle'));
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

type ContentProps = {
    data: any[],
    type: Kotilogi.UsageTypeType,
}

export function Content({data, type}: ContentProps){
    const [selectedData, setSelectedData] = useState<any>(null);
    const {data: currentData, updateData: updateCurrentData, reset: resetInputData} = useInputData({type});
    const [showAddModal, setShowAddModal] = useState(false);
    const [status, setStatus] = useState<'loading' | 'idle' | 'error'>('idle');
    const formRef = useRef<HTMLFormElement | null>(null);

    const getChartTitle = () => {
        if(type === 'heat'){
            return 'Lämmitys';
        }

        if(type === 'water'){
            return 'Vesi';
        }

        if(type === 'electric'){
            return 'Sähkö';
        }

        return 'Tuntematon';
    }
    
    const selectDataPoint = (dataPointIndex: number) => {
        const item = data.at(dataPointIndex);
        formRef.current?.reset();
        resetInputData(item);
        setSelectedData(item);
    }

    const deleteDataPoint = () => {

        const c = confirm('Olet poistamassa kulutustietoa. Oletko varma?');
        if(!c) return;
        
        setStatus('loading');
        deleteUsage(selectedData)
        .then(() => setSelectedData(null))
        .catch(err => toast.error(err.message))
        .finally(() => setStatus('idle'));
    }

    const updateDataPoint = () => {
        console.log(currentData.time);
        setStatus('loading');

        updateUsage(currentData)
        .catch(err => toast.error(err.message))
        .finally(() => {
            console.log('Update done.');
            setStatus('idle');
        });
    }

    const loading = status === 'loading';

    const totalPrice = data.reduce((acc, cur) => {
        return acc + parseFloat(cur.price);
    }, 0);

    const isSubmitDisabled = () => {
        return !selectedData || loading || currentData.price === '' || currentData.time === undefined;
    }

    useEffect(() => {
        resetInputData({type});
    }, [type])

    const propertyId: string = data.at(0)?.refId;

    return (
        <div className="flex flex-row gap-2 w-full">

                <AddUsageModal 
                    show={showAddModal} 
                    onHide={() => setShowAddModal(false)} 
                    id={'add-usage-data-modal'} 
                    />

                <div className="flex-1">
                    <RoundedBox>
                        <BorderHeader>
                            <Flex value={1}>
                                <Group direction="row" justify="between" align="center">
                                    <BoxHeading>Kulutustiedot</BoxHeading>

                                    <Group direction="row" gap={2} align="center">
                                        <div className="mr-8">
                                            <TypeNav>
                                                <Link href="?type=heat">Lämmitys</Link>
                                                <Link href="?type=water">Vesi</Link>
                                                <Link href="?type=electric">Sähkö</Link>
                                            </TypeNav>
                                        </div>
                                        
                                        <PrimaryButton onClick={() => setShowAddModal(true)}>
                                            <img src="/icons/plus.png" className="invert"/>
                                        </PrimaryButton>
                                    </Group>
                                </Group>
                            </Flex>
                        </BorderHeader>

                        <UsageColumnChart 
                            options={{
                                title: {
                                    text: getChartTitle(),
                                },

                                colors:[colors[type]],
                            }} 
                            data={data} 
                            columnColor={colors[type]}
                            onDataPointSelected={selectDataPoint}/>
                    </RoundedBox>
                </div>
                
                <div className="flex-1 h-full flex flex-col gap-2">
                    <ContentCard title="Yhteenveto">
                        <Input label="Yhteenlaskettu hinta" description="Hinta euroissa." value={totalPrice.toFixed(2)} disabled={true} />
                    </ContentCard>
                    
                    <ContentCard title="Nykyinen valinta">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            updateDataPoint();
                        }} ref={formRef} className="flex flex-col gap-4 w-full">
                            <Input 
                                onChange={updateCurrentData}
                                type="number" 
                                name="price" 
                                label="Hinta" 
                                description="Laskun hinta euroissa." 
                                step="0.01"
                                defaultValue={selectedData?.price || undefined}/>

                            <Input 
                                onChange={updateCurrentData}
                                type="date" 
                                name="time" 
                                label="Päiväys" 
                                description="Laskun päiväys." 
                                defaultValue={selectedData?.time}
                                disabled={isSubmitDisabled()}/>

                            <Group direction="row" gap={2} justify="end">
                                <SecondaryButton hidden={!selectedData} onClick={deleteDataPoint} disabled={loading || isSubmitDisabled()}>Poista</SecondaryButton>
                                <PrimaryButton 
                                    loading={loading}
                                    disabled={isSubmitDisabled()} 
                                    type="submit">Päivitä</PrimaryButton>
                            </Group>
                        </form>
                    </ContentCard>
                </div>
        </div>
    );    
}

type PageContentProps = {
    allData: Kotilogi.UsageType[],
    property: Kotilogi.PropertyType,
    year: string,
    type: Kotilogi.UsageTypeType | 'all',
}

export function Controls({property}){
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
                <span className="text-slate-500">Suodata:</span>
                <DateRangeSelector startYear={new Date(property.createdAt).getFullYear()}/>
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

export function Header(){
    
}

export function PageContent({allData, year, type}: PageContentProps){
    const getChart = () => {
        if(type === 'all'){
            return <AllUsageDataChart data={allData}/>
        }
        else {
            return <UsageColumnChart data={allData} columnColor={colors[type]} options={{
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
                            <TotalPrice data={allData}/>
                            <div className="flex justify-center items-center relative">
                                <UsagePieChart data={allData}/>
                                <div className="absolute text-2xl text-slate-500">
                                    {year}
                                </div>
                            </div>

                            {
                                type === 'all' ? <UsageDataCategorized data={allData}/> : null
                            }
                            
                        </div>
                    </div>
                </ContentCard>
            </div>
            
            <div className="flex-1 overflow-y-scroll max-h-[100%]">
                <ContentCard title="Tiedot">
                    <DataList data={allData} />
                </ContentCard>
            </div>
        </div>
    )
}