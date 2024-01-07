'use client';

import React, { useEffect } from "react";
import { useRef, useState } from "react";

type StatusType = 'idle' | 'success' | 'error' | 'loading';

function useSharedState(){
    const [status, setStatus] = useState<StatusType>('idle');
    const [editing, setEditing] = useState(false);

    return {status, setStatus, editing, setEditing};
}

export function useSingleInputForm(inputElement: JSX.Element, initialCancelFallbackValue: string){

    const {status, setStatus, editing, setEditing} = useSharedState();

    /**The value the input is reset to if canceling an edit*/
    const cancelFallbackValue = useRef(initialCancelFallbackValue);

    /**A ref to the current value of the input. Changes when the input is changed. */
    const inputValue = useRef(inputElement.props.defaultValue);

    /**The input element to be rendered. */
    const [renderedInput, setRenderedInput] = useState(() => 
        React.cloneElement<HTMLInputElement>(inputElement, {
            ...inputElement.props,
            disabled: !editing,
            onChange: (e) => {
                inputValue.current = e.target.value
            },
            autocomplete: 'off',
        })
    )

    /**Method to call when initiating editing of the input. */
    const edit = () => {
        setEditing(true);
    }

    /**Method to call when canceling the editing of the input. */
    const cancelEdit = () => {
        //Revert the input back to the state it was in before editing.
        setRenderedInput(
            React.cloneElement(renderedInput, {
                ...renderedInput.props,
                value: cancelFallbackValue.current,
            })
        )
        setEditing(false);
    }

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
    
    useEffect(() => {
        setRenderedInput(
            React.cloneElement(renderedInput, {
                ...renderedInput.props,
                disabled: !editing,
                value: undefined,
            })
        );
    }, [editing]);

    return {
        renderedInput,
        editing,
        status,
        edit,
        cancelEdit,
        onSubmit,
    }
}