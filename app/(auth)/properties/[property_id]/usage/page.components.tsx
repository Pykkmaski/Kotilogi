'use client';

import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import SecondaryButton from "kotilogi-app/components/Button/SecondaryButton";
import { ContentCard, RoundedBox } from "kotilogi-app/components/RoundedBox/RoundedBox";
import { BorderHeader } from "kotilogi-app/components/Header/Header";
import { Input } from "kotilogi-app/components/Input/Input";
import { useInputData } from "kotilogi-app/components/Modals/BaseAddModal.hooks";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { BoxHeading } from "kotilogi-app/components/Heading/Heading";
import { useQuery } from "kotilogi-app/hooks/useQuery";
import { Flex } from "kotilogi-app/components/Util/Flex";
import { Group } from "kotilogi-app/components/Group/Group";
import { UsageColumnChart } from "kotilogi-app/components/Experimental/Chart/Chart";
import { deleteUsage } from "kotilogi-app/actions/usage/deleteUsage";
import { updateUsage } from "kotilogi-app/actions/usage/updateUsage";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { addUsageData } from "kotilogi-app/actions/usage/addUsageData";
import { usePropertyContext } from "../_util/PropertyContextProvider";

type AddUsageModalProps = React.PropsWithChildren & ModalProps & {
    type: Kotilogi.UsageTypeType,
}

function AddUsageModal({type, ...props}: AddUsageModalProps){
    const {property} = usePropertyContext();
    const {updateData, data} = useInputData({refId: property.id, type});
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const formRef = useRef<HTMLFormElement | null>(null);

    const formId = `${props.id}-form`;

    const loading = status === 'loading';

    const closeModal = () => {
        formRef.current?.reset();
        props.onHide();
    }

    const submitUsageData = (e) => {
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

    return (
        <Modal {...props}>
            <Modal.Header>Lisää Kulutustieto</Modal.Header>
            <Modal.Body>
                <form id={formId} onSubmit={submitUsageData}>
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
                <SecondaryButton desktopText="Peruuta" onClick={closeModal}/>
                <PrimaryButton desktopText="Lisää" type="submit" loading={loading} disabled={loading} form={formId}/>
            </Modal.Footer>
        </Modal>
    )
}

function TypeSelector({type}){
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
    const {data: currentData, updateData: updateCurrentData, reset: resetInputData} = useInputData(selectedData);
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
        .catch(err => toast.error(err.message))
        .finally(() => setStatus('idle'));
    }

    const updateDataPoint = () => {
        setStatus('loading');

        updateUsage(currentData)
        .catch(err => toast.error(err.message))
        .finally(() => setStatus('idle'));
    }

    const getDataPointColor = () => {
        if(type === 'heat'){
            return '#f00';
        }

        if(type === 'water'){
            return '#00f';
        }

        if(type === 'electric'){
            return '#0ff';
        }

        return '#000';
    }

    const totalPrice = data.reduce((acc, cur) => {
        return acc + cur.price;
    }, 0);

    const loading = status === 'loading';

    return (
        <Group gap="0.5rem" direction="horizontal">
            <AddUsageModal 
                show={showAddModal} 
                onHide={() => setShowAddModal(false)} 
                id={'add-usage-data-modal'} 
                type={type}/>

            <Flex value={1}>
                <RoundedBox>
                    <BorderHeader>
                        <Flex value={1}>
                            <Group direction="horizontal" justifyContent="space-between" alignItems="center">
                                <BoxHeading>Kulutustiedot</BoxHeading>

                                <Group direction="horizontal">
                                    <TypeSelector type={type}/>
                                    <PrimaryButton desktopText="" mobileIconSrc="/icons/plus.png" onClick={() => setShowAddModal(true)}/>
                                </Group>
                            </Group>
                        </Flex>
                    </BorderHeader>

                    <UsageColumnChart 
                        options={{
                            title: {
                                text: getChartTitle(),
                            },
                        }} 
                        data={data} 
                        dataPointColor={getDataPointColor()}
                        onDataPointSelected={selectDataPoint}/>
                </RoundedBox>
            </Flex>
            
            
            <Flex value={1.25}>
                <Group direction="vertical" gap="0.5rem">

                    <ContentCard title="Yleiskatsaus">
                        <Input label="Yhteenlaskettu hinta" description="Hinta euroissa." value={totalPrice} disabled={true} />
                    </ContentCard>
                    
                    <Flex value={1}>
                        <ContentCard title="Nykyinen valinta">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                updateDataPoint();
                            }} ref={formRef}>
                                <Input 
                                    onChange={updateCurrentData}
                                    type="number" 
                                    name="price" 
                                    label="Hinta" 
                                    description="Laskun hinta euroissa." 
                                    defaultValue={selectedData?.price}/>

                                <Input 
                                    onChange={updateCurrentData}
                                    type="date" 
                                    name="time" 
                                    label="Päiväys" 
                                    description="Laskun päiväys." 
                                    defaultValue={selectedData?.time}/>

                                <Group direction="horizontal" gap="0.5rem" justifyContent="right">
                                    <SecondaryButton desktopText="Poista" hidden={!selectedData} onClick={deleteDataPoint} disabled={loading}/>
                                    <PrimaryButton 
                                        loading={loading}
                                        desktopText="Päivitä" 
                                        disabled={!selectedData || loading} 
                                        type="submit"/>
                                </Group>
                            </form>
                        </ContentCard>
                    </Flex>
                    
                </Group>
            </Flex>
        </Group>
    )
}