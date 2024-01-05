export type StateType = {
    properties: {id: string}[] | null,
    selectedProperties: {id: string}[],
};

export type ActionType = {
    type: 'select_property',
    value: {id: string},
} | {
    type: 'set_properties',
    value: {id: string}[],
}

export function reducer(state: StateType, action: ActionType){
    switch(action.type){
        case 'select_property':{
            const newSelectedProperties = [...state.selectedProperties];
            const indexOfItem = newSelectedProperties.indexOf(action.value);
            if(indexOfItem !== -1){
                //Deselect the property.
                newSelectedProperties.splice(indexOfItem, 1);
            }
            else{
                newSelectedProperties.push(action.value);
            }

            return {
                ...state,
                selectedProperties: newSelectedProperties,
            }
        }

        case 'set_properties':{
            return {
                ...state,
                properties: action.value,
            }
        }

        default: return state;
    }
}