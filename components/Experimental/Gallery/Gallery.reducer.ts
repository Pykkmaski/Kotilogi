export type StateType<DataT> = {
    selectedItems: DataT[],
}

export type ActionType<DataT> = {
    type: 'select_item',
    value: DataT,
}

export function reducer<DataT extends Kotilogi.IdType>(state: StateType<DataT>, action: ActionType<DataT>){
    switch(action.type){
        case 'select_item':{
            const newSelectedItems = [...state.selectedItems];
            const indexOfItem = newSelectedItems.indexOf(action.value);

            if(indexOfItem !== -1){
                //Deselect the item.
                newSelectedItems.splice(indexOfItem, 1);
            }
            else{
                newSelectedItems.push(action.value);
            }

            return {
                ...state,
                selectedItems: newSelectedItems,
            }
        }
    }
}