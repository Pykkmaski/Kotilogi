'use client';

import { useChangeInput } from "kotilogi-app/hooks/useChangeInput"
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Group } from "../Group/Group";
import SecondaryButton from "../Button/SecondaryButton";
import PrimaryButton from "../Button/PrimaryButton";
import style from './style.module.scss';
import { InputProps } from "../Input/Input";
import { useSingleInputForm } from "./SingleInputForm.hooks";

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

export type SingleInputFormProps = {
    inputElement: JSX.Element,
    onSubmit?: (value: object) => Promise<object>,
}

/**A wrapper for inputs adding buttons to the bottom of it to submit the value of the input.*/
export function SingleInputForm({inputElement, ...props}: SingleInputFormProps){
    const {
        renderedInput,
        cancelEdit,
        onSubmit,
        setEditing,
        editing,
        status,
    } = useSingleInputForm({inputElement, ...props});

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