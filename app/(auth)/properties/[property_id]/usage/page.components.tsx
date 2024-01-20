'use client';

import { updateDataById } from "kotilogi-app/actions/data/updateData";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import SecondaryButton from "kotilogi-app/components/Button/SecondaryButton";
import Chart from "kotilogi-app/components/Chart/Chart";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { Group } from "kotilogi-app/components/Experimental/Group/Group";
import { Header } from "kotilogi-app/components/Header/Header";
import { Input } from "kotilogi-app/components/Input/Input";
import { useInputData } from "kotilogi-app/components/Modals/BaseAddModal.hooks";
import { SplitScreen } from "kotilogi-app/components/SplitScreen/SplitScreen";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ContentProps = {
    data: any[],
    type: string,
}

export function Content({data, type}: ContentProps){
    const [selectedData, setSelectedData] = useState<any>(null);
    const {data: currentData, updateData: updateCurrentData} = useInputData(selectedData);
    
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
    
    const selectDataPoint = (dataPointIndex) => {
        const item = data.at(dataPointIndex);
        setSelectedData(item);
    }

    const totalPrice = data.reduce((acc, cur) => {
        return acc + cur.price;
    }, 0);

    return (
        <Group gap="0.5rem" weights={[1, 1.3]} direction="horizontal">
            <EditCard title="Kulutustiedot">
                <Chart data={data} title={getChartTitle()} type={type} onDataPointSelected={selectDataPoint}/>
            </EditCard>

            <Group direction="vertical" weights={[1, 1]} gap="0.5rem">
                <EditCard title="Ylesikatsaus">
                    <Group direction="vertical" weights={[1]}>
                        <Input label="Yhteenlaskettu hinta" defaultValue={totalPrice} disabled={true} />
                    </Group>
                </EditCard>

                <EditCard title="Tiedot">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        updateDataById(currentData, currentData.id, 'usage')
                        .catch(err => toast.error('Tiedon päivitys epäonnistui!'));
                    }}>
                        <Input 
                            onChange={updateCurrentData}
                            type="number" 
                            name="price" 
                            label="Hinta" 
                            description="Laskun hinta euroissa" 
                            defaultValue={selectedData?.price}/>

                        <Input 
                            onChange={updateCurrentData}
                            type="date" 
                            name="time" 
                            label="Päiväys" 
                            description="Laskun päiväys." 
                            defaultValue={selectedData?.time}/>

                        <Group direction="horizontal" justifyContent="right" weights={[0, 0]}>
                            <SecondaryButton desktopText="Poista"/>
                            <PrimaryButton desktopText="Päivitä" disabled={false}/>
                        </Group>
                    </form>
                </EditCard>
            </Group>
        </Group>
    )
}