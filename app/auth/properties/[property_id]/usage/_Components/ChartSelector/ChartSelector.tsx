"use client";

import { useEffect, useReducer } from "react";
import style from './style.module.scss';
import reducer from './Util/reducer';
import getUsageDataByCategory from "./Util/getUsageDataByCategory";
import ChartEntry from "../Chart/Components/Entry/ChartEntry";
import ChartSelectorProvider from "./ChartSelectorContext";
import AddModal from "./Components/Header/Components/AddButton/Components/AddModal/AddModal";
import { Sections } from "./Types/Sections";
import getChartBySection from "./Util/getChartBySection";
import Header from "./Components/Header/Header";
import { useParams, useRouter, useSearchParams } from "next/navigation";

type Props = {
    usage: Kotilogi.UsageType[],
}

export default function ChartSelector(props: Props){
    const searchParams = useSearchParams();
    const {property_id} = useParams();
    const router = useRouter();

    const initialState = {
        data: props.usage,
        isLoading: false,
        showAddModal: false,
        showDeleteModal: false,
        selectedSection: searchParams.get('section') || 'heat' as Sections,
        selectedType: 'bar',
        selectedItems: [],
        propertyId: property_id,
        viewType: searchParams.get('viewType') || 'chart',
    }

    const [state, dispatch] = useReducer(reducer, initialState as any);

    const contextValue = {
        state,
        dispatch,
    }

    useEffect(() => {
        const url = `?viewType=${state.viewType}&section=${state.selectedSection}`;
        router.replace(url);
    }, [state.viewType]);

    const dataToDisplay = state.data.filter(item => item.type === state.selectedSection);
    //console.log(dataToDisplay);

    return(
        <ChartSelectorProvider contextValue={contextValue}>
            <Header/>
           {
                state.viewType === 'chart' 
                ? 
                <section id="chart-selector-charts">
                    {
                        getChartBySection(state.selectedSection, dataToDisplay)
                    }
                </section>
                :
                <section className={style.list}>
                    {
                        dataToDisplay.map((item, index: number) => {
                            return (
                                <ChartEntry data={item} id={`entry-${index}`} key={`usage-entry-${index}`}/>
                            )
                        })
                    }
                </section>
           }
        </ChartSelectorProvider>
    )
}