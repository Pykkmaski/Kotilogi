'use client';

import { useChangeInput } from "kotilogi-app/hooks/useChangeInput"
import React, { useState } from "react";
import { Group } from "../Group";
import SecondaryButton from "../Button/SecondaryButton";
import {PrimaryButton} from "../Button/PrimaryButton";
import style from './style.module.scss';
import { InputProps, SelectProps, TextAreaProps } from "../Input/Input";
import { useInputComponent, useSingleInputForm } from "./SingleInputForm.hooks";

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
        <div className="flex flex-1 flex-row justify-end w-full gap-4">
            {
                props.editing ? 
                <Group direction="row" gap={4}>
                    <SecondaryButton 
                        onClick={props.cancelEdit}
                        hidden={loading}>Peruuta</SecondaryButton>

                    <PrimaryButton 
                        type="button" 
                        onClick={props.onSubmit}
                        loading={loading}
                        disabled={loading}>Tallenna</PrimaryButton>
                </Group>
                :
                <PrimaryButton 
                    type="button" 
                    onClick={() => props.edit()}>Muokkaa</PrimaryButton>
            }
        </div>
    );
}

export type SingleInputFormProps = {
    submitMethod: (value: object) => Promise<object | void>,
    inputComponent: React.FC<InputProps | TextAreaProps>,
    initialInputProps: InputProps | TextAreaProps,
    editingDisabled?: boolean,
}

/**A wrapper for inputs adding buttons to the bottom of it to submit the value of the input.*/
export function SingleInputForm({inputComponent: InputComponent, ...props}: SingleInputFormProps){
    const {
        editing,
        status,
        edit,
        cancelEdit,
        onSubmit,
        cancelFallbackValue,
        inputValue,
    } = useSingleInputForm(props.initialInputProps);

    return (
        <div className="w-full">
            <Group direction="col" gap={4}>
                <InputComponent 
                    {...props.initialInputProps} 
                    disabled={!editing} 
                    defaultValue={cancelFallbackValue.current}
                    value={
                        editing ? undefined : cancelFallbackValue.current}
                    onChange={(e) => inputValue.current = e.target.value}
                    title={!editing && !props.editingDisabled ? 'Paina Muokkaa-nappia muokataksesi.' : undefined}/>

                {
                    !props.editingDisabled ? 
                    <Controls 
                        editing={editing} 
                        edit={edit}
                        onSubmit={() => {
                            onSubmit(props.submitMethod)
                        }} 
                        status={status}
                        cancelEdit={cancelEdit}/>
                    :
                    null
                }
                
            </Group>
        </div>
    );
}

export type SingleSelectFormProps = {
    inputComponent: React.FC<SelectProps>,
    childComponent: React.FC<React.ComponentProps<'option'>>,
    childProps: React.ComponentProps<'option'>[],
    initialInputProps: SelectProps,
    submitMethod: (value: object) => Promise<object>,
    editingDisabled?: boolean,
}

export function SingleSelectForm({inputComponent: InputComponent, childComponent: ChildComponent, ...props}: SingleSelectFormProps){
    const {
        editing,
        inputValue,
        edit,
        cancelEdit,
        status,
        onSubmit,
        cancelFallbackValue,
        
    } = useSingleInputForm<SelectProps>(props.initialInputProps);

    const inputId = crypto.randomUUID();

    return (
        <div className="w-full">
            <Group direction="col" gap={4}>
                <InputComponent 
                    {...props.initialInputProps} 
                    disabled={!editing} 
                    onChange={(e) => {
                        inputValue.current = e.target.value;
                        //props.initialInputProps.onChange && props.initialInputProps.onChange(e);
                    }}
                >
                    {/**Render all children when editing and just the defaultValue if not*/}
                    {
                        editing ? 
                        props.childProps.map((childProps, index: number) => {
                            //Determine the selected status of the option through the default value, or the fallback value.
                            const selected = cancelFallbackValue.current === childProps.value;

                            return (
                                <ChildComponent 
                                    {...childProps} 
                                    selected={selected}
                                    key={`input-option-${inputId}-${index}`}> {childProps.children} </ChildComponent>
                            )
                        }) 
                        :
                        props.childProps.map(childProps => {
                            if(childProps.value === cancelFallbackValue.current){
                                return <ChildComponent {...childProps} >{childProps.children}</ChildComponent>
                            }
                        })
                    }
            
                </InputComponent>
                {
                    !props.editingDisabled ? 
                    <Controls 
                        editing={editing} 
                        edit={edit}
                        onSubmit={() => {
                            onSubmit(props.submitMethod)
                        }} 
                        status={status}
                        cancelEdit={cancelEdit}/>
                    :
                    null
                }
            </Group>
        </div>
    );
}