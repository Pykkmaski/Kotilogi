'use client';

import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { InputProps, SelectProps, TextAreaProps } from "../Input/Input";

type StatusType = 'idle' | 'success' | 'error' | 'loading';

export function useInputComponent<PropsT extends InputProps | SelectProps | TextAreaProps>(
    InputComponent: React.FC<PropsT>, 
    initialInputProps: PropsT){

    const [renderedElement, setRenderedElement] = useState(
        <InputComponent {...initialInputProps}/>
    );

    return [renderedElement, setRenderedElement] as const;
}

function useSharedState<PropsT extends InputProps | SelectProps | TextAreaProps>(initialInputProps: PropsT){
    const [status, setStatus] = useState<StatusType>('idle');

    /**The value the input is reset to if canceling an edit*/
    const cancelFallbackValue = useRef(initialInputProps.defaultValue);

    /**A ref to the current value of the input. Changes when the input is changed. */
    const inputValue = useRef(initialInputProps.defaultValue);

    return {
        status, 
        setStatus, 
        cancelFallbackValue,
        inputValue,
    };
}

/**
 * 
 * @param callback Method called when canceling an edit.
 * @returns 
 */
function useEdit(){
    const [editing, setEditing] = useState(false);

    /**Method to call when initiating editing of the input. */
    const edit = () => {
        setEditing(true);
    }

    /**Method to call when canceling the editing of the input. */
    const cancelEdit = () => {
        //Revert the input back to the state it was in before editing.
        setEditing(false);
    }

    return {
        editing,
        setEditing,
        edit,
        cancelEdit,
    }
}

export function useSingleInputForm<PropsT extends InputProps | SelectProps | TextAreaProps>(initialInputProps: PropsT){
    const {
        status, 
        setStatus, 
        cancelFallbackValue,
        inputValue,
    } = useSharedState<PropsT>(initialInputProps);

    const {editing, setEditing, edit, cancelEdit} = useEdit();
     

    /**
     * Method to call when submitting the input data. Calls the passed method within.
     * @param method The actual implementation used for submitting.
     */
    const onSubmit = (method: (data: object) => Promise<object>) => {
        const dataToSubmit = {
            [initialInputProps.name!] : inputValue.current,
        }

        setStatus('loading');
        method(dataToSubmit)
        .then(() => {
            cancelFallbackValue.current = inputValue.current;
            setStatus('success');
            setEditing(false);
        })
        .catch(err => {
            setStatus('error');
            console.log(err.message);
        });
    } 

    return {
        editing,
        status,
        edit,
        cancelEdit,
        onSubmit,
        cancelFallbackValue,
        inputValue,
    }
}