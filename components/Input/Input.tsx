'use client';

import { CSSProperties, useEffect, useRef, useState } from "react"
import { Group } from "../Group";
import style from './style.module.scss';

const borderRadius = '10px';

const containerStyle: CSSProperties = {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '1fr 3fr',
    minHeight: '2rem',
    gap: '1rem',
}

const inputStyle: CSSProperties = {
    flex: 1,
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    borderRadius,
    width: '100%',
}

function Label(props: {
    text: string,
    description?: string,
    required?: boolean,
}){
    const getRequiredBadge = () => {
        if(props.required){
            return <span className={style.required}>Pakollinen</span>;
        }
        else{
            return null;
        }
    }
    const getDescription = () => {
        if(props.description){
            return (
                <span className="text-base text-slate-500">{props.description}</span>
            );
        }
        else{
            return null;
        }
    }

    return (
        <>
            <div className="sm:hidden md:block">
                <Group direction="col" justify="center">
                    <span className="text-[1.1rem] text-black">{props.text} {getRequiredBadge()}</span>
                    {getDescription()}
                </Group>
            </div>

            <div className="sm:block md:hidden">
                <label>{props.text} {getRequiredBadge()}</label>
            </div>
        </>
        
    );
}

export type InputProps = React.ComponentProps<'input'> & {
    label: string,
    description?: string,
    ref?: any,
}

export function Input({label, description, ...props}: InputProps){
    return (
        <div className="grid grid-cols-inputComponentColumns w-full min-h-[2rem] gap-4">
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