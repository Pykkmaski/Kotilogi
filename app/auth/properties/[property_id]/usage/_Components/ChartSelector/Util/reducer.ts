
import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";
import { ChartDatapointType } from "../../Chart/ChartDatapointType";
import { serverGetDataByRefId } from "kotilogi-app/actions/serverGetData";

type ViewType = 'chart' | 'list';

type State = {
    data: Kotilogi.UsageType[],
    showAddModal: boolean,
    showDeleteModal: boolean,
    isLoading: boolean,
    selectedSection: 'heat' | 'water' | 'electric',
    selectedChartType: ChartDatapointType,
    selectedItems: Kotilogi.IdType[],
    propertyId: string,
    viewType: ViewType,
}

type Action = {
    type: 'set_view_type' | 'toggle_add_modal' | 'toggle_delete_modal' | 'toggle_section' | 'toggle_loading' | 'set_chart_type' | 'toggle_selected' | 'add_data' | 'delete_selected',
    value: any,
}

export default function chartSelectorReducer(state: State, action: Action): State{
    switch(action.type){
        case 'toggle_add_modal':{
            return {
                ...state,
                showAddModal: action.value,
            }
        }

        case 'toggle_delete_modal':{
            return {
                ...state,
                showDeleteModal: action.value,
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

        case 'delete_selected':{
            (async () => {
                await serverDeleteDataByIds(state.selectedItems, 'usage');
                const newData = await serverGetDataByRefId(state.propertyId, 'usage');
                return {
                    ...state,
                    data: newData,
                }
            })();
        }

        case 'set_chart_type':{
            console.log('Changing chart type to: ' + action.value);
            return {
                ...state,
                selectedChartType: action.value,
            }
        }

        case 'toggle_selected':{
            const indexOfItem: number = state.selectedItems.findIndex(id => id === action.value);
            //The index is not already selected
            if(indexOfItem < 0) return {
                ...state,
                selectedItems: [...state.selectedItems, action.value],
            }
            else{
                //The index is selected. Remove it.
                const newSelected = [...state.selectedItems];
                newSelected.splice(indexOfItem, 1);
                return {
                    ...state,
                    selectedItems: newSelected,
                }
            }
        }

        case 'set_view_type':{
            return {
                ...state,
                viewType: action.value,
            }
        }

        default: return state;
    }
}