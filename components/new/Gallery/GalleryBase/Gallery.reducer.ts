import { serverAddData } from "kotilogi-app/actions/addData";
import { GalleryStateType } from "./Gallery.hooks";

export type ActionTypeT = 
    'select_item' | 
    'add_data' | 
    'set_search' |
    'delete_items' |
    'toggle_loading' | 
    'toggle_error' |
    'set_data' | 
    'reset_selected' | 
    'set_page_number';

export type ActionT = {
    type: ActionTypeT,
    value: any,
}

export default function GalleryBaseReducer(state: GalleryStateType, action: ActionT): GalleryStateType{
    switch(action.type){
        case 'select_item':{
            const newSelectedItems = [...state.selectedItems];
            const indexOfItem = newSelectedItems.findIndex(item => item.id === action.value.id);

            if(indexOfItem == -1){
                //The does not exist in the currently selected items. Add it to the list.
                newSelectedItems.push(action.value);
            }
            else{
                //The item is already selected. Deselect it.
                newSelectedItems.splice(indexOfItem, 1);
            }

            return {
                ...state,
                selectedItems: newSelectedItems,
            }
        }

        case 'reset_selected': {
            return {
                ...state,
                selectedItems: [],
            }
        }

        case 'add_data': {
            return {
                ...state,
                data: [...state.data, action.value],
            }
        }

        case 'delete_items':{
           if(action.value.length === undefined) throw new Error('Action value prop must be an array');

            const oldData = [...state.data];
            for(const item of action.value){
                const indexOfItem = oldData.findIndex(oldItem => item.id === oldItem.id);
                if(indexOfItem < 0) throw new Error('Item is not in data!');
                oldData.splice(indexOfItem, 1);
            }

            return {
                ...state,
                data: oldData,
            }
        }

        case 'toggle_loading':{
            return {
                ...state,
                isLoading: action.value,
            }
        }

        case 'toggle_error':{
            return {
                ...state,
                error: action.value,
            }
        }

        case 'set_data': {
            const newState: GalleryStateType = {
                ...state,
                data: [...action.value]
            };

            return newState;
        }

        case 'set_page_number':{
            return {
                ...state,
                currentPage: action.value,
            }
        }

        case 'set_search':{
            return {
                ...state,
                search: action.value,
            }
        }

        default: return state;
    }
}