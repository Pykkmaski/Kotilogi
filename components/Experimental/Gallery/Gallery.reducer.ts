export type StateType = {
    selectedItems: any[],
}

export type ActionType = {
    type: 'select_item',
    value: any,
}

export function reducer(state: StateType, action: ActionType){
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