'use client';

import React, { useEffect } from "react";
import { useRef, useState } from "react";

type StatusType = 'idle' | 'success' | 'error' | 'loading';

function useRenderedInput<ElementT extends HTMLInputElement>(
    inputElement: JSX.Element, 
    isInitiallyDisabled: boolean, 
    inputValue: React.MutableRefObject<string>){

    /**The input element to be rendered. */
    const [renderedInput, setRenderedInput] = useState(() => 
        React.cloneElement<ElementT>(inputElement, {
            ...inputElement.props,
            disabled: isInitiallyDisabled,
            onChange: (e) => {
                inputValue.current = e.target.value
            },
            autocomplete: 'off',
        })
    );

    return [renderedInput, setRenderedInput] as const;
}

function useSharedState(inputElement: JSX.Element, initialCancelFallbackValue: string){
    const [status, setStatus] = useState<StatusType>('idle');

    /**The value the input is reset to if canceling an edit*/
    const cancelFallbackValue = useRef(initialCancelFallbackValue);

    /**A ref to the current value of the input. Changes when the input is changed. */
    const inputValue = useRef(inputElement.props.defaultValue);


    return {
        status, 
        setStatus, 
        cancelFallbackValue,
        inputValue,
    };
}

/**
 * 
 * @param callback Method called before setting the editing state to false.
 * @returns 
 */
function useEdit(callback: () => void){
    const [editing, setEditing] = useState(false);

    /**Method to call when initiating editing of the input. */
    const edit = () => {
        setEditing(true);
    }

    /**Method to call when canceling the editing of the input. */
    const cancelEdit = () => {
        //Revert the input back to the state it was in before editing.
        setEditing(false);
        callback();
    }

    return {
        editing,
        setEditing,
        edit,
        cancelEdit,
    }
}

/**Wraps a useEffect to be triggered when the editing state of the form is changed. */
function useUpdateOnEdit(editing: boolean, callback: () => void){
    useEffect(callback, [editing]);
}

export function useSingleInputForm(inputElement: JSX.Element, initialCancelFallbackValue: string){

    const {
        status, 
        setStatus, 
        cancelFallbackValue,
        inputValue,
    } = useSharedState(inputElement, initialCancelFallbackValue);

    const [renderedInput, setRenderedInput] = useRenderedInput<HTMLInputElement>(inputElement, true, inputValue);

    const {editing, setEditing, edit, cancelEdit} = useEdit(() => {
        setRenderedInput(
            React.cloneElement(renderedInput, {
                ...renderedInput.props,
                value: cancelFallbackValue.current,
            })
        );
    });

    useUpdateOnEdit(editing, () => {
        setRenderedInput(
            React.cloneElement(renderedInput, {
                ...renderedInput.props,
                disabled: !editing,
                value: undefined,
            })
        );
    });

    /**
     * Method to call when submitting the input data. Calls the passed method within.
     * @param method The actual implementation used for submitting.
     */
    const onSubmit = (method: (data: object) => Promise<object>) => {
        const dataToSubmit = {
            [renderedInput.props.name] : inputValue.current,
        }

        console.log(dataToSubmit);
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
        renderedInput,
        editing,
        status,
        edit,
        cancelEdit,
        onSubmit,
    }
}