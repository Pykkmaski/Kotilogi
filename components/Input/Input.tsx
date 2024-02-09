'use client';

import { useEffect, useRef, useState } from "react"
import { Group } from "../Group";

const containerClassName = "lg:grid lg:grid-cols-inputComponentColumns md:flex md:flex-col w-full min-h-[2rem] md:gap-1 sm:gap-1";

const inputClassName = 'flex-1 px-[0.5rem] rounded-[10px] w-full border bg-white border-[#DDD] disabled:bg-[#EEE]';

function Label(props: {
    text: string,
    description?: string,
    required?: boolean,
}){
    const getRequiredBadge = () => {
        if(props.required){
            return <span className="text-[#b27070]">Pakollinen</span>;
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
        <div className="sm:hidden md:block">
            <Group direction="col" justify="center">
                <span className="text-[1.1rem] text-black">{props.text} {getRequiredBadge()}</span>

                <div className="sm:hidden lg:block">
                    {getDescription()}
                </div>
            </Group>
        </div>
    );
}

export type InputProps = React.ComponentProps<'input'> & {
    label: string,
    description?: string,
    ref?: any,
}

export function Input({label, description, ...props}: InputProps){
    return (
        <div className={containerClassName}>
            <Label 
                text={label} 
                required={props.required} 
                description={description}/>

            <input 
                {...props}
                className={inputClassName}
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
        <div className={containerClassName}>
            <Label 
                text={props.label} 
                description={props.description}
                required={props.required}/>
                
            <select className={inputClassName} {...props}>
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

    const textareaClassName = [
        'flex-col',
        inputClassName,
    ];

    useEffect(() => setLength(ref.current?.value.length), []);
    return (
        <div className={containerClassName}>
            <Label text={props.label} {...props}/>
            <Group direction="col" gap={2}>
                <textarea {...props} className={textareaClassName.join(' ')} ref={ref} onChange={(e) => {
                    props.onChange && props.onChange(e);
                    setLength(ref.current?.value.length);
                }}/>
            </Group>
        </div>
    )
}