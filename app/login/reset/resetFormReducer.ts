"use client";

import { throwErrorIfNull } from "kotilogi-app/utils/throwErrorIfNull";

type ActionType = 'step_forward' | 'step_backwards' | 'set_email' | 'set_error' | 'reset' | 'set_loading';

export type Action = {
    type: ActionType,
    value: number | string | null | boolean,
}

export type State = {
    email: string | null,
    step: number,
    error: string | number | null,
    isLoading: boolean,
}

export const emailKey: string = 'kotilogi-pass-reset-email';

export default function resetFormReducer(state: State, action: Action){
    switch(action.type){
        case 'step_forward':
            return {
                ...state,
                step: state.step + 1,
            }

        case 'step_backwards':
            return {
                ...state,
                step: state.step - 1,
            }

        case 'set_email':{
            throwErrorIfNull(action.value, 'resetFormReducer: Email cannot be null!');
            sessionStorage.setItem(emailKey, action.value as string);
            return {
                ...state,
                email: action.value,
            }
        }
            
        case 'set_error':
            return {
                ...state,
                error: action.value,
            }

        case 'reset':{
            sessionStorage.removeItem(emailKey);
            return {
                error: null,
                email: null,
                step: 1,
            }
        }

        case 'set_loading':{
            return {
                ...state,
                isLoading: action.value,
            }
        }

        default: return state;
    }
}