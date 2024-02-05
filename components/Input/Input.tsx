'use client';

import { CSSProperties, useEffect, useRef, useState } from "react"
import { Group } from "../Group";
import style from './style.module.scss';

const borderRadius = '10px';

const containerStyle: CSSProperties = {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '1fr 3fr',
    minHeight: '3rem',
    gap: '1rem',
}

const inputStyle: CSSProperties = {
    flex: 1,
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    borderRadius,
}

function Label(props: {
    text: string,
    description?: string,
    required?: boolean,
}){

    const requiredBadge = props.required ? <span className={style.required}>Pakollinen</span> : null;

    return (
        <Group direction="col" justify="center">
            <span style={{
                fontSize: '1.1rem',
                color: 'black',
            }}>{props.text} {requiredBadge}</span>
            
            {
                props.description ? <span style={{
                    fontSize: '1rem',
                    color: '#999',
                }}>{props.description}</span>
                :
                null
            }
            
        </Group>
    );
}

export type InputProps = React.ComponentProps<'input'> & {
    label: string,
    description?: string,
    ref?: any,
}

/**
 * An input component responsible for handling the submission of singular values to the server.
 * @param props 
 * @returns 
 */
export function Input({label, description, ...props}: InputProps){
    return (
        <div style={containerStyle}>
            <Label 
                text={label} 
                required={props.required} 
                description={description}/>

            <input 
                {...props}
                style={inputStyle}
                className={style.input}
                ref={props.ref}/>
        </div>
    );
}

export type SelectProps = React.ComponentProps<'select'> & {
    label: string,
    description?: string,
}

/**
 * A select component containing within it a label.
 * @param props 
 * @returns 
 */
export function Select(props: SelectProps){
    return (
        <div style={containerStyle}>
            <Label 
                text={props.label} 
                description={props.description}
                required={props.required}/>
                
            <select style={inputStyle} {...props} className={style.input}>
                {props.children}
            </select>
        </div>
    );
}

function Option({children, ...props}: React.ComponentProps<'option'>){
    return (
        <option {...props}>{children}</option>
    );
}

Select.Option = Option;

function TextareaCharacterCounter({currentLength, max}: {currentLength: number | undefined, max: number | undefined}){
    return (
        <Group direction="row" gap={4}>
            <span>{currentLength} / {max}</span>
        </Group>
    )
}

export type TextAreaProps = React.ComponentProps<'textarea'> & {
    label: string,
    description?: string,
}

export function Textarea(props: TextAreaProps){
    const ref = useRef<HTMLTextAreaElement | null>(null);
    const [length, setLength] = useState<number | undefined>(undefined);

    const textareaStyle: CSSProperties = {
        flexFlow: 'column',
    }

    const textareaLabelStyle: CSSProperties = {
        ...inputStyle,
    }

    useEffect(() => setLength(ref.current?.value.length), []);
    return (
        <div style={containerStyle}>
            <Label text={props.label} {...props}/>
            <Group direction="col" gap={2}>
                <textarea {...props} style={textareaStyle} className={style.input} ref={ref} onChange={(e) => {
                    props.onChange && props.onChange(e);
                    setLength(ref.current?.value.length);
                }}/>
                
            </Group>
        </div>
    )
}