'use client';

import { useChangeInput } from "kotilogi-app/hooks/useChangeInput"
import React, { useState } from "react";
import { Group } from "../Group/Group";
import SecondaryButton from "../Button/SecondaryButton";
import PrimaryButton from "../Button/PrimaryButton";
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
    submitMethod: (value: object) => Promise<object>,
    inputComponent: React.FC<InputProps | TextAreaProps>,
    initialInputProps: InputProps | TextAreaProps,
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
        <Group direction="vertical" gap="1rem">
            <InputComponent 
                {...props.initialInputProps} 
                disabled={!editing} 
                defaultValue={cancelFallbackValue.current}
                value={
                    editing ? undefined : cancelFallbackValue.current}
                onChange={(e) => inputValue.current = e.target.value}/>

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

export type SingleSelectFormProps = {
    inputComponent: React.FC<SelectProps>,
    childComponent: React.FC<React.ComponentProps<'option'>>,
    childProps: React.ComponentProps<'option'>[],
    initialInputProps: SelectProps,
    submitMethod: (value: object) => Promise<object>,
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

    return (
        <Group direction="vertical" gap="1rem">
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
                    props.childProps.map(childProps => {
                         //Determine the selected status of the option through the default value, or the fallback value.
                        const selected = cancelFallbackValue.current === childProps.value;

                        return (
                            <ChildComponent 
                                {...childProps} 
                                selected={selected
                                }> {childProps.children} </ChildComponent>
                        )
                    }) 
                    :
                    props.childProps.map(childProps => {
                        if(childProps.value === cancelFallbackValue.current){
                            return <ChildComponent {...childProps} />
                        }
                    })
                }
          
            </InputComponent>

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