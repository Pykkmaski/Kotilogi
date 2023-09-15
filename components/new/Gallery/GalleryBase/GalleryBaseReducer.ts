import { serverAddData } from "kotilogi-app/actions/serverAddData";

type AcceptedTypes = Kotilogi.PropertyType | Kotilogi.EventType;

async function addData(data: any, dbTableName: string): Promise<any | null>{
    try{
        const newData = await serverAddData(data, dbTableName);
        return newData;
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}

export default function GalleryBaseReducer(state: GalleryBase.State, action: GalleryBase.Action): GalleryBase.State{
    switch(action.type){
        case 'select_id':{
            const newSelectedIds = [...state.selectedItemIds];
            const index = newSelectedIds.indexOf(action.value);
            if(index > -1){
                newSelectedIds.splice(index, 1);
            }
            else{
                newSelectedIds.push(action.value);
            }

            return {
                ...state,
                selectedItemIds: newSelectedIds,
            }
        }

        case 'select_all':{
            console.log('seelcting all')
            return {
                ...state,
                selectedItemIds: state.data.map(item => item.id) as string[],
            }
        }

        case 'reset_selected': {
            return {
                ...state,
                selectedItemIds: [],
            }
        }

        case 'toggle_add_modal': {
            return {
                ...state,
                showAddModal: action.value,
            }
        }

        case 'add_data': {
            const newState: GalleryBase.State = {
                ...state,
                showAddModal: false,
                data: [...state.data, action.value],
                isLoading: false,
            }
            
            return newState;
        }

        case 'toggle_loading':{
            return {
                ...state,
                isLoading: action.value,
            }
        }

        case 'set_data': {
            const newState: GalleryBase.State = {
                ...state,
                data: [...action.value]
            };

            return newState;
        }

        default: return state;
    }
}