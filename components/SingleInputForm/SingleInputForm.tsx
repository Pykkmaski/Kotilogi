'use client';

import { useChangeInput } from "kotilogi-app/hooks/useChangeInput"
import React from "react";
import { Group } from "../Group/Group";
import SecondaryButton from "../Button/SecondaryButton";
import PrimaryButton from "../Button/PrimaryButton";
import style from './style.module.scss';
import { InputProps } from "../Input/Input";
import { useSingleInputForm } from "./SingleInputForm.hooks";

type ControlsProps = {
    editing: boolean,
    status: 'loading' | 'idle' | 'error' | 'success',
    onSubmit?: () => void,
    cancelEdit: () => void,
    edit: () => void,
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
                <PrimaryButton 
                    desktopText="Muokkaa" 
                    type="button" 
                    onClick={() => props.edit()}/>
            }
        </div>
    );
}

export type SingleInputFormProps = {
    inputElement: JSX.Element,
    submitMethod: (value: object) => Promise<object>,
}

/**A wrapper for inputs adding buttons to the bottom of it to submit the value of the input.*/
export function SingleInputForm({inputElement, ...props}: SingleInputFormProps){
    const {
        renderedInput,
        editing,
        status,
        onSubmit,
        cancelEdit,
        edit,
    } = useSingleInputForm(inputElement, inputElement.props.defaultValue);

    return (
        <Group direction="vertical" gap="1rem">
            {renderedInput} 
            <Controls 
                editing={editing} 
                edit={edit}
                onSubmit={() => {
                    onSubmit(props.submitMethod)
                }} 
                status={status}
                cancelEdit={cancelEdit}/>
        </Group>
    )
}