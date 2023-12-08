import { serverAddData } from "kotilogi-app/actions/serverAddData";
import { GalleryBase } from "./declerations";

export default function GalleryBaseReducer(state: GalleryBase.State, action: GalleryBase.Action): GalleryBase.State{
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

        case 'select_all':{
            return {
                ...state,
                selectedItems: state.data.map(item => item.id) as string[],
            }
        }

        case 'reset_selected': {
            return {
                ...state,
                selectedItems: [],
            }
        }

        case 'toggle_add_modal': {
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

        case 'toggle_edit_modal':{
            return {
                ...state,
                showEditModal: action.value,
            }
        }

        case 'update_item':{
            const updatedData = [...state.data];
            const indexOfItemToUpdate = updatedData.findIndex(item => item.id === action.value.id);

            
            if(indexOfItemToUpdate > -1){
                updatedData[indexOfItemToUpdate] = action.value;
                console.log('item updated.')
            }

            return {
                ...state,
                data: updatedData,
            }
        }

        case 'add_data': {
            return {
                ...state,
                data: [...state.data, action.value],
            }
        }

        case 'delete_data': {
            const oldData = [...state.data];
            const indexOfDataToDelete = oldData.findIndex(item => item.id === action.value);
            if(indexOfDataToDelete < 0) {
                console.log('Cannot delete data, as the index of the item with id ' + action.value + ' does not exist!');
                return state;
            }

            oldData.splice(indexOfDataToDelete, 1);
            return {
                ...state,
                data: oldData,
            }
        }

        case 'delete_items':{
           if(action.value.length !== undefined) throw new Error('Action value prop must be an array');

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
            const newState: GalleryBase.State = {
                ...state,
                data: [...action.value]
            };

            return newState;
        }

        case 'set_viewtype':{
            return {
                ...state,
                viewType: action.value,
            }
        }

        case 'set_page_number':{
            return {
                ...state,
                currentPage: action.value,
            }
        }

        

        default: return state;
    }
}