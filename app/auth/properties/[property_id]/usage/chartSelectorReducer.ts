
import { ChartDatapointType } from "./ChartDatapointType";

type State = {
    data: Kotilogi.UsageType[],
    showModal: boolean,
    isLoading: boolean,
    selectedSection: 'heat' | 'water' | 'electric',
    selectedType: ChartDatapointType,
}

type Action = {
    type: 'toggle_modal' | 'toggle_section' | 'toggle_loading' | 'toggle_charttype' | 'add_data' ,
    value: any,
}

export default function chartSelectorReducer(state: State, action: Action){
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