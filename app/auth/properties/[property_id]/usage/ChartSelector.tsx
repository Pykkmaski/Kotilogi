"use client";

import { useReducer, useState } from "react";
import HeatingUsageChart from "./HeatingUsageChart";
import WaterUsageChart from "./WaterUsageChart";
import ElectricalUsageChart from "./ElectricalUsageChart";
import styles from './page.module.scss';
import Modal from "kotilogi-app/components/Modals/Modal";
import reducer from './chartSelectorReducer';
import { serverAddData } from "kotilogi-app/actions/serverAddData";
import Form from "kotilogi-app/components/Form";
import { usePropertyProvider } from "kotilogi-app/contexts/PropertyProvider";
import { UsageType } from "kotilogi-app/types/UsageType";
import getUsageDataByCategory from "./getUsageDataByCategory";
import ChartEntry from "./ChartEntry";

type Sections = 'heating' | 'water' | 'electric';

type ChartSelectorProps = {
    usage: UsageType[],
}


export default function ChartSelector(props: ChartSelectorProps){
    const {property} = usePropertyProvider();

    const initialState = {
        data: props.usage,
        isLoading: false,
        showModal: false,
        selectedSection: 'heating' as Sections,
        selectedType: 'bar',
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSectionChange = (e: any) => {
        dispatch({
            type: 'toggle_section',
            value: e.target.value,
        })
    }

    const handleTypeChange = (e: any) => {
        dispatch({
            type: 'toggle_charttype',
            value: e.target.value,
        })
    }

    const formAction = async (e: any) => {
        e.preventDefault();
        const currentSection = state?.selectedSection;
        const data = {
            time: new Date(e.target.time.value).getTime(),
            price: e.target.amount.valueAsNumber,
            property_id: property.id,
            type: currentSection,
        }
        await serverAddData(data, 'usage');
        dispatch({type: 'add_data', value: data});
        dispatch({type: 'toggle_modal', value: false});
    }
    
    return(
        <>
            <Modal show={state.showModal} onHide={() => dispatch({type: 'toggle_modal', value: false})}>
                <Modal.Header>
                    {
                        state.selectedSection === 'heating' ? 'Lisää lämmityskulu'
                        :
                        state.selectedSection === 'water' ? 'Lisää vedenkäyttökulu'
                        :
                        state.selectedSection === 'electric' ? 'Lisää sähkönkulutustieto'
                        :
                        'Lisää kulutustieto'
                    }
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
            </Modal>
            
            <section id="chart-selector-header" className={styles.selectorHeader}>
                <div>
                    <select onChange={handleSectionChange}>
                        <option value="heating">Lämmitys</option>
                        <option value="water">Vesi</option>
                        <option value="electric">Sähkö</option>
                    </select>

                    <select onChange={handleTypeChange}>
                        <option value="bar">Palkki</option>
                        <option value="line">Viiva</option>
                    </select>
                </div>
                
                <button className="add primary" onClick={() => dispatch({type: 'toggle_modal', value: true})}>Lisää Uusi Tieto</button>
            </section>
           
           <section id="chart-selector-charts">
                {
                    state.selectedSection === 'heating' ? <HeatingUsageChart type={state.selectedType} data={getUsageDataByCategory(state.selectedSection, state.data)}/>
                    :
                    state.selectedSection === 'water' ? <WaterUsageChart type={state.selectedType} data={getUsageDataByCategory(state.selectedSection, state.data)}/>
                    :
                    state.selectedSection === 'electric' ? <ElectricalUsageChart type={state.selectedType} data={getUsageDataByCategory(state.selectedSection, state.data)}/>
                    : 
                    null
                }
           </section>

           <section className={styles.chartEntryList}>
                {
                    getUsageDataByCategory(state.selectedSection, state.data).map((item, index: number) => {
                        return (
                            <ChartEntry data={item}/>
                        )
                    })
                }
           </section>
        </>
    )
}