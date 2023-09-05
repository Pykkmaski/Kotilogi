type State = {
    showModal: boolean,
    isLoading: boolean,
    selectedSection: 'heating' | 'water' | 'electric',
}

type Action = {
    type: 'toggle_modal' | 'toggle_section' | 'toggle_loading',
    value: any,
}

export default function chartSelectorReducer(state: State, action: Action): State{
    switch(action.type){
        case 'toggle_modal':{
            return {
                ...state,
                showModal: action.value,
            }
        }

        case 'toggle_section':{
            return {
                ...state,
                selectedSection: action.value,
            }
        }

        default: return state;
    }
}