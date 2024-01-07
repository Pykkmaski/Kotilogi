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
}

function Controls(props: ControlsProps){
    const loading = props.status === 'loading';

    return (
        <div className={style.controls}>
            {
                props.editing ? 
                <Group direction="horizontal">
                    <SecondaryButton desktopText="Peruuta" onClick={() => props.setEditing(false)}/>
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
    const inputDefaultValue = inputElement.props.defaultValue;

    const [status, setStatus] = useState<'loading' | 'error' | 'success' | 'idle'>('idle');
    const [editing, setEditing] = useState(false);
    const inputValue = useRef<object>({
        [inputName] : inputDefaultValue,
    });

    const renderedInput = React.cloneElement(inputElement, {
        ...inputElement.props, 
        disabled: !editing,
        onChange: (e) => inputValue.current = {
            [inputName] : e.target.value,
        }
    });

    const onSubmit = async () => {
        if(!props.onSubmit) return;
        const value = inputValue.current;

        setStatus('loading');
        
        props.onSubmit(value)
        .then(() => {
            setEditing(false);
            setStatus('success');
        })
        .catch(err => {
            setStatus('error');
            console.log(err.message);
        });
    }

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
                    status={status}/>
                :
                null
            }
            
        </Group>
    )
}