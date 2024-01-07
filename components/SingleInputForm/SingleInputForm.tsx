'use client';

import { useChangeInput } from "kotilogi-app/hooks/useChangeInput"
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Group } from "../Group/Group";
import SecondaryButton from "../Button/SecondaryButton";
import PrimaryButton from "../Button/PrimaryButton";
import style from './style.module.scss';
import { InputProps } from "../Input/Input";

type ControlsProps = {
    editing: boolean,
    setEditing: React.Dispatch<React.SetStateAction<boolean>>,
    status: 'loading' | 'idle' | 'error' | 'success',
    onSubmit?: () => Promise<void>,
    cancelEdit: () => void,
}

function Controls(props: ControlsProps){
    const loading = props.status === 'loading';

    return (
        <div className={style.controls}>
            {
                props.editing ? 
                <Group direction="horizontal">
                    <SecondaryButton 
                        desktopText="Peruuta" 
                        onClick={props.cancelEdit}
                        hidden={loading}/>

                    <PrimaryButton 
                        desktopText="Tallenna" 
                        type="button" 
                        onClick={props.onSubmit}
                        loading={loading}
                        disabled={loading}/>
                </Group>
                :
                <PrimaryButton desktopText="Muokkaa" type="button" onClick={() => props.setEditing(true)}/>
            }
        </div>
    );
}

type SingleInputFormProps = React.ComponentProps<'form'> & {
    inputElement: JSX.Element,
    onSubmit?: (value: object) => Promise<object>,
}

/**A wrapper for inputs adding buttons to the bottom of it to submit the value of the input.*/
export function SingleInputForm({inputElement, ...props}: SingleInputFormProps){
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

    return (
        <Group direction="vertical" gap="1rem">
            {renderedInput} 
            {
                props.onSubmit 
                ? 
                <Controls 
                    editing={editing} 
                    setEditing={setEditing} 
                    onSubmit={onSubmit} 
                    status={status}
                    cancelEdit={cancelEdit}/>
                :
                null
            }
            
        </Group>
    )
}