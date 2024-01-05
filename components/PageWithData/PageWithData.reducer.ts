export type StateType<DataT> = {
    items: DataT[] | null,
    selectedItems: DataT[],
    displayedItems: DataT[],
};

export type ActionType<DataT> = {
    type: 'select_item',
    value: DataT,
} | {
    type: 'set_items',
    value: DataT[],
} | {
    type: 'set_query',
    value: string,
}

export function reducer<DataT extends Kotilogi.ItemType>(state: StateType<DataT>, action: ActionType<DataT>): StateType<DataT>{
    switch(action.type){
        case 'select_item':{
            const newSelectedItems = [...state.selectedItems];
            const indexOfItem = newSelectedItems.indexOf(action.value);
            if(indexOfItem !== -1){
                //Deselect the property.
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

        case 'set_items':{
            return {
                ...state,
                items: action.value,
            }
        }

        case 'set_query':{
            var newState = {...state};
            if(state.items !== null){
                if(action.value === '') {
                    newState = {
                        ...state,
                        displayedItems: state.items,
                    }
                }
                else{
                    const displayedItems = [...state.items.filter(item => (
                            item.title.includes(action.value) 
                            ||
                            item.description && item.description.includes(action.value)
                        )
                    )];

                    newState = {
                        ...state,
                        displayedItems,
                    }
                }
            }
        
            return newState;
        }

        default: return state;
    }
}