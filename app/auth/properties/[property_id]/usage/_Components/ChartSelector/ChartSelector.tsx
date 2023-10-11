"use client";

import { useReducer } from "react";
import style from './style.module.scss';
import reducer from './Util/reducer';
import getUsageDataByCategory from "./Util/getUsageDataByCategory";
import ChartEntry from "../Chart/Components/Entry/ChartEntry";
import ChartSelectorProvider from "./ChartSelectorContext";
import AddModal from "./Components/Header/Components/AddButton/Components/AddModal/AddModal";
import { Sections } from "./Types/Sections";
import getChartBySection from "./Util/getChartBySection";
import Header from "./Components/Header/Header";
import { useSearchParams } from "next/navigation";

type Props = {
    usage: Kotilogi.UsageType[],
}

export default function ChartSelector(props: Props){
    const searchParams = useSearchParams();

    const initialState = {
        data: props.usage,
        isLoading: false,
        showAddModal: false,
        showDeleteModal: false,
        selectedSection: 'heat' as Sections,
        selectedType: 'bar',
        selectedItems: [],
        propertyId: props.usage[0].refId,
        viewType: 'chart',
    }

    const [state, dispatch] = useReducer(reducer, initialState as any);

    const contextValue = {
        state,
        dispatch,
    }

    return(
        <ChartSelectorProvider contextValue={contextValue}>
            <Header/>
           {
                state.viewType === 'chart' 
                ? 
                <section id="chart-selector-charts">
                    {
                        getChartBySection(state.selectedSection, state.data)
                    }
                </section>
                :
                <section className={style.list}>
                    {
                        getUsageDataByCategory(state.selectedSection, state.data).map((item, index: number) => {
                            return (
                                <ChartEntry data={item} id={`usage-entry-${index}`}/>
                            )
                        })
                    }
                </section>
           }
        </ChartSelectorProvider>
    )
}