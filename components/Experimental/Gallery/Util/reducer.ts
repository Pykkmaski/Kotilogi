type Action = {
    type: 'set_data' | 'add_data' | 'delete_data' | 'set_loading' | 'set_error',
    value: any,
}

type State = {
    data: (Kotilogi.PropertyType | Kotilogi.EventType)[],
    loading: boolean,
    error: string,
}

export default function reducer(state: State, action: Action): State{
    switch(action.type){
        case 'set_data':{
            return {
                ...state,
                data: action.value,
            }
        }
        
        case  'add_data': {
            const newData = [...state.data, action.value];
            return {
                ...state,
                data: newData,
            }
        };

        case 'delete_data': {
            const currentData = [...state.data];
            
            //Find the index of the item with the id in the stored data array.
            const item = currentData.find(item => item.id === action.value);
            const itemIndex = currentData.indexOf(item);

            //Abort if the item is not present.
            if(itemIndex < 0) {
                console.log('Item with id ' + action.value + ' not found! Returning current state.');
                return state;
            }

            //Delete the item at the index.
            currentData.splice(itemIndex, 1);

            return {
                ...state,
                data: currentData,
            }
        }

        case 'set_loading':{
            //Set the loading state of the gallery.
            return {
                ...state,
                loading: action.value,
            }
        }

        case 'set_error':{
            //Set the error state of the gallery.
            return {
                ...state,
                error: action.value,
            }
        }

        default: return state;
    }
}