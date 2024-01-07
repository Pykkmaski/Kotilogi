import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { SingleInputFormProps } from "./SingleInputForm";

export function useSingleInputForm({inputElement, ...props}: SingleInputFormProps){
    const inputName = inputElement.props.name;
    const inputDefaultValue = useRef<string | number>(inputElement.props.defaultValue);

    const [status, setStatus] = useState<'loading' | 'error' | 'success' | 'idle'>('idle');
    const [editing, setEditing] = useState(false);

    const [renderedInput, setRenderedInput] = useState(
        React.cloneElement<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(inputElement, {
            ...inputElement.props, 
            disabled: !editing,
            onChange: (e) => inputValue.current = {
                [inputName] : e.target.value,
            },
            autocomplete: 'off',
        })
    );

    const inputValue = useRef<object>({
        [inputName] : inputDefaultValue.current,
    });

    const onSubmit = async () => {
        if(!props.onSubmit) return;
        const value = inputValue.current;

        setStatus('loading');

        props.onSubmit(value)
        .then(() => {
            setEditing(false);
            setStatus('success');
            inputDefaultValue.current = value[inputName];
        })
        .catch(err => {
            setStatus('error');
            console.log(err.message);
        });
    }

    const cancelEdit = () => {
        //This function should return the input to its default value.
        setRenderedInput(
            React.cloneElement(renderedInput, {
                ...renderedInput.props,
                value: inputDefaultValue.current as any,
            }));

        setEditing(false);
    }

    useEffect(() => {
        const newProps = {
            ...renderedInput.props,
            disabled: !editing,
            value: undefined,
        }

        setRenderedInput(
            React.cloneElement(renderedInput, newProps));
    }, [editing]);

    return {
        renderedInput,
        status,
        editing,
        setStatus,
        setEditing,
        onSubmit,
        cancelEdit,
    }
}