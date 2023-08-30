export interface State{
    showAddModal: boolean,
    showDeleteModal: boolean,
}

export interface Action{
    type: 'toggle_add_modal' | 'toggle_delete_modal',
    setting: boolean,
}

export const reducer = (state: State, action: Action) => {
    switch(action.type){
        case 'toggle_add_modal':{
            return {
                ...state,
                showAddModal: action.setting,
                showDeleteModal: false,
            }
        };

        case 'toggle_delete_modal':{
            return {
                ...state,
                showDeleteModal: action.setting,
                showAddModal: false,
            }
        };

        default: return state;
    }
}