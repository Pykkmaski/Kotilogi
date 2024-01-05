type ItemType = {
    id: string,
    title: string,
    description: string,
}

export type StateType = {
    items: ItemType[] | null,
    selectedItems: ItemType[],
    displayedItems: ItemType[],
};

export type ActionType = {
    type: 'select_item',
    value: ItemType,
} | {
    type: 'set_items',
    value: ItemType[],
} | {
    type: 'set_query',
    value: string,
}

export function reducer(state: StateType, action: ActionType): StateType{
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