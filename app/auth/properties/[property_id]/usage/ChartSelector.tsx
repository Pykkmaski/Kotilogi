"use client";

import { useReducer, useState } from "react";
import HeatingUsageChart from "./HeatingUsageChart";
import WaterUsageChart from "./WaterUsageChart";
import ElectricalUsageChart from "./ElectricalUsageChart";
import styles from './page.module.scss';
import chartSelectorReducer from './chartSelectorReducer';
import { serverAddData } from "kotilogi-app/actions/serverAddData";
import Form from "kotilogi-app/components/Form";
import { usePropertyProvider } from "kotilogi-app/contexts/PropertyProvider";
import getUsageDataByCategory from "./getUsageDataByCategory";
import ChartEntry from "./ChartEntry";
import Modal, { ModalOptions } from "kotilogi-app/components/new/Modal/Modal";
import Button from "kotilogi-app/components/Button/Button";
import PlusIcon from 'kotilogi-app/assets/plus.png';

type Sections = 'heat' | 'water' | 'electric';

type ChartSelectorProps = {
    usage: Kotilogi.UsageType[],
}


function getChartBySection(section: Sections, data: any[]): JSX.Element | null{
    const filteredData = getUsageDataByCategory(section, data);
    if(section === 'heat'){
        return <HeatingUsageChart data={filteredData}/>
    }
    else if(section === 'electric'){
        return <ElectricalUsageChart data={filteredData}/>
    }
    else if(section === 'water'){
        return <WaterUsageChart data={filteredData}/>
    }
    else{
        return null;
    }
}

export default function ChartSelector(props: ChartSelectorProps){
    const {property} = usePropertyProvider();

    const initialState = {
        data: props.usage,
        isLoading: false,
        showModal: false,
        selectedSection: 'heat' as Sections,
        selectedType: 'bar',
    }

    const [state, dispatch] = useReducer(chartSelectorReducer, initialState);
    const [viewType, setViewType] = useState<'chart' | 'list'>('chart');

    const handleSectionChange = (e: any) => {
        dispatch({
            type: 'toggle_section',
            value: e.target.value,
        })
    }

    const handleViewChange = (e: any) => {
        setViewType(e.target.value);
    }

    const formAction = async (e: any) => {
        e.preventDefault();
        const currentSection = state?.selectedSection;
        const data = {
            time: new Date(e.target.time.value).getTime(),
            price: e.target.amount.valueAsNumber,
            refId: property.id,
            type: currentSection,
        }
        await serverAddData(data, 'usage');
        dispatch({type: 'add_data', value: data});
        dispatch({type: 'toggle_modal', value: false});
    }

    const addModalOptions: ModalOptions = {
        header: {
            text: 'Lisää kulutustieto',
            closeButton: true,
        },

        body: (
            <Form onSubmit={formAction}>
                <Form.Group>
                    <label>Määrä euroissa</label>
                    <input type="number" step="0.01" name="amount" required></input>
                </Form.Group>

                <Form.Group>
                    <label>Päivämäärä</label>
                    <input type="date" name="time" required></input>
                </Form.Group>

                <Form.ButtonGroup>
                    <button type="button" className="secondary" onClick={() => dispatch({type: 'toggle_modal', value: false})}>Peruuta</button>
                    <button type="submit" className="primary">Lisää</button>
                </Form.ButtonGroup>
            </Form>
        ),
    }
    
    return(
        <>
            <Modal 
                options={addModalOptions} 
                show={state.showModal} 
                onHide={() => dispatch({type: 'toggle_modal', value: false})}
                id={'new-usage-data-modal'}
            />
            <section id="chart-selector-header" className={styles.selectorHeader}>
                <div className={styles.selectors}>
                    <select onChange={handleSectionChange}>
                        <option value="heat">Lämmitys</option>
                        <option value="water">Vesi</option>
                        <option value="electric">Sähkö</option>
                    </select>

                    <select onChange={handleViewChange}>
                        <option value="chart">Kaavio</option>
                        <option value="list">Lista</option>
                    </select>
                </div>
                
                <Button 
                    className="primary" 
                    onClick={() => dispatch({type: 'toggle_modal', value: true})}
                    mobileIconSrc={PlusIcon}
                    desktopText="Lisää Uusi Tieto"
                />
            </section>
           
           {
                viewType === 'chart' 
                ? 
                <section id="chart-selector-charts">
                    {
                        getChartBySection(state.selectedSection, state.data)
                    }
                </section>
                :
                <section className={styles.chartEntryList}>
                    {
                        getUsageDataByCategory(state.selectedSection, state.data).map((item, index: number) => {
                            return (
                                <ChartEntry data={item}/>
                            )
                        })
                    }
                </section>
           }
        </>
    )
}