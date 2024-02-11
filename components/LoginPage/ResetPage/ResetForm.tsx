"use client";

import { useReducer } from "react";
import resetFormReducer, { State } from "./resetFormReducer";
import ResetFormProvider from "./ResetFormContext";
import { useSearchParams } from "next/navigation";
import { StepOne } from "./ResetStepOne";
import { StepTwo } from "./ResetStepTwo";

export default function ResetForm(){
    const params = useSearchParams();
    const token = params.get('token');

    const initialValue: State = {
        token,
        step:  token ? 2 : 1,
        status: -1,
        isLoading: false,
    }

    const [state, dispatch] = useReducer(resetFormReducer, initialValue);

    function previous(): void{
        dispatch({
            type: 'step_backwards',
            value: null,
        });
    }

    function next(): void{
        dispatch({
            type: 'step_forward',
            value: null,
        });
    }

    function reset(): void{
        dispatch({
            type: 'reset',
            value: null,
        });
    }

    return (
        <ResetFormProvider state={state as State} next={next} previous={previous} reset={reset} dispatch={dispatch}>
            {    
                state.step === 1 ? <StepOne />
                :
                state.step === 2 ? <StepTwo />
                : 
                null
            }
        </ResetFormProvider>
        
    )
}