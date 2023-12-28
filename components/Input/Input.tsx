import { CSSProperties } from "react"
import * as stylex from '@stylexjs/stylex';

const borderRadius = '10px';

const containerStyle: CSSProperties = {
    display: 'flex',
    width: '100%',
    borderRadius,
    border: '1px solid #DDD',
}

const inputStyle: CSSProperties = {
    flex: 1,
    border: 'none',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    backgroundColor: 'white',
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
}

function Label(props: {
    text: string,
    required?: boolean,
}){
    const labelStyle: CSSProperties = {
        minWidth: '20%',
        background: '#DDD',
        color: 'black',
        border: 'none',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        paddingLeft: '0.5rem',
        backgroundColor: 'var(--primary-color)',
        fontWeight: '600',
    }

    const requiredBadge = props.required ? <i style={{color: 'red'}}>*</i> : null;

    return <div style={labelStyle}>{props.text}{requiredBadge}</div>
}

type InputProps = React.ComponentProps<'input'> & {
    label: string,
}

/**
 * An input component containing within it a label.
 * @param props 
 * @returns 
 */
export function Input(props: InputProps){
    return (
        <div style={containerStyle}>
            <Label text={props.label} required={props.required}/>
            <input style={inputStyle} {...props}/>
        </div>
    )
}

type SelectProps = React.ComponentProps<'select'> & {
    label: string,
}

/**
 * A select component containing within it a label.
 * @param props 
 * @returns 
 */
export function Select(props: SelectProps){
    return (
        <div style={containerStyle}>
            <Label text={props.label} required={props.required}/>
            <select style={inputStyle} {...props}>
                {props.children}
            </select>
        </div>
    );
}

type TextAreaProps = React.ComponentProps<'textarea'> & {
    label: string,
}

export function Textarea(props: TextAreaProps){
    const textareaStyle: CSSProperties = {

        flexFlow: 'column',
    }

    const textareaLabelStyle: CSSProperties = {
        minWidth: '10%',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
    }

    return (
        <div style={textareaStyle}>
            <div style={textareaLabelStyle}>{props.label}</div>
            <textarea {...props}/>
        </div>
    )
}