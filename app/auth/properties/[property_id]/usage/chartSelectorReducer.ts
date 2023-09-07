import { UsageType } from "kotilogi-app/types/UsageType";
import getUsageDataByCategory from "./getUsageDataByCategory";
import { ChartDatapointType } from "./ChartDatapointType";

type State = {
    data: UsageType[],
    showModal: boolean,
    isLoading: boolean,
    selectedSection: 'heating' | 'water' | 'electric',
    selectedType: ChartDatapointType,
}

type Action = {
    type: 'toggle_modal' | 'toggle_section' | 'toggle_loading' | 'toggle_charttype' | 'add_data' ,
    value: any,
}

export default function chartSelectorReducer(state: State, action: Action): State{
    switch(action.type){
        case 'toggle_modal':{
            return {
                ...state,
                showModal: action.value,
            }
        }

        case 'toggle_section':{
            return {
                ...state,
                selectedSection: action.value,
            }
        }

        case 'add_data':{
            const newData = [...state.data, action.value];
            return {
                ...state,
                data: newData,
            }
        }

        case 'toggle_charttype':{
            return {
                ...state,
                selectedType: action.value,
            }
        }

        default: return state;
    }
}