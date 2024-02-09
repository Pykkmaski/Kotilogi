'use client';

import {PrimaryButton} from "kotilogi-app/components/Button/PrimaryButton";
import {SecondaryButton} from "kotilogi-app/components/Button/SecondaryButton";
import { ContentCard, RoundedBox } from "kotilogi-app/components/RoundedBox/RoundedBox";
import { BorderHeader } from "kotilogi-app/components/Header/Header";
import { Input } from "kotilogi-app/components/Input/Input";
import { useInputData } from "kotilogi-app/components/Modals/BaseAddModal.hooks";
import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BoxHeading } from "kotilogi-app/components/Heading";
import { useQuery } from "kotilogi-app/hooks/useQuery";
import { Flex } from "kotilogi-app/components/Util/Flex";
import { Group } from "kotilogi-app/components/Group";
import { UsageColumnChart } from "kotilogi-app/components/Experimental/Chart/Chart";
import { deleteUsage } from "kotilogi-app/actions/usage/deleteUsage";
import { updateUsage } from "kotilogi-app/actions/usage/updateUsage";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { addUsageData } from "kotilogi-app/actions/usage/addUsageData";
import { usePropertyContext } from "../_util/PropertyContextProvider";
import Link from "next/link";
import { TypeNav } from "@/components/UsagePage/TypeNav";
import { UsagePieChart } from "@/components/UsagePage/PieChart";

type AddUsageModalProps = React.PropsWithChildren & ModalProps & {
    type: Kotilogi.UsageTypeType,
}

function AddUsageModal({type, ...props}: AddUsageModalProps){
    console.log(type);
    const {property} = usePropertyContext();
    const {updateData, data, reset: resetInputData} = useInputData({refId: property.id, type});
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const formRef = useRef<HTMLFormElement | null>(null);

    const formId = `${props.id}-form`;

    const loading = status === 'loading';

    const closeModal = () => {
        formRef.current?.reset();
        props.onHide();
    }

    const submitUsageData = (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        
        console.log(data);

        addUsageData(data)
        .catch(err => toast.error('Tiedon lisääminen epäonnistui!'))
        .finally(() => {
            closeModal();
            setStatus('idle');
        });
    }

    const getTitle = () => {
        if(type === 'heat'){
            return 'Lisää lämmityskulu';
        }
        else if(type === 'water'){
            return 'Lisää vesikulu';
        }
        else if(type === 'electric'){
            return 'Lisää sähkökulu';
        }
        else{
            return 'Lisää tuntematon';
        }
    }

    useEffect(() => {
        resetInputData({refId: property.id, type});
    }, [type])

    return (
        <Modal {...props}>
            <Modal.Header>{getTitle()}</Modal.Header>
            <Modal.Body>
                <form id={formId} onSubmit={submitUsageData} className="flex flex-col gap-4">
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
                <SecondaryButton onClick={closeModal} type="button">Peruuta</SecondaryButton>
                <PrimaryButton type="submit" loading={loading} disabled={loading} form={formId}>Lisää</PrimaryButton>
            </Modal.Footer>
        </Modal>
    )
}

type TypeSelectorProps = {
    type: Kotilogi.UsageTypeType,
}

function TypeSelector({type}: TypeSelectorProps){
    const {onChange: onQueryChange} = useQuery('type', type);

    return (
        <select name="query" onChange={onQueryChange}>
            <option value="heat" selected={type === 'heat'}>Lämmitys</option>
            <option value="water" selected={type === 'water'}>Vesi</option>
            <option value="electric" selected={type === 'electric'}>Sähkö</option>
        </select>
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

    const getDataPointColor = () => {
        if(type === 'heat'){
            return '#f00';
        }

        if(type === 'water'){
            return '#00f';
        }

        if(type === 'electric'){
            return '#ff0';
        }

        return '#000';
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
        <div className="flex flex-col gap-4 w-full">
            <Group gap={2} direction="row">
                <AddUsageModal 
                    show={showAddModal} 
                    onHide={() => setShowAddModal(false)} 
                    id={'add-usage-data-modal'} 
                    type={type}/>

                <Flex value={1}>
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

                                colors:[getDataPointColor()],
                            }} 
                            data={data} 
                            columnColor={getDataPointColor()}
                            onDataPointSelected={selectDataPoint}/>
                    </RoundedBox>
                </Flex>
                
                
                <Flex value={1.25}>
                    <Group direction="col" gap={2}>
                        <div className="w-full">
                            <ContentCard title="Yhteenveto">
                                <Input label="Yhteenlaskettu hinta" description="Hinta euroissa." value={totalPrice.toFixed(2)} disabled={true} />
                            </ContentCard>
                        </div>
                        
                        <div className="flex-1 w-full h-full">
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
                                            defaultValue={selectedData?.price || undefined}
                                            disabled={isSubmitDisabled()}/>

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
                    </Group>
                </Flex>
            </Group>
        </div>
    );
        
}