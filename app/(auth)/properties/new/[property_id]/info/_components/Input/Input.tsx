import { HTMLInputTypeAttribute } from "react"
import style from './input.module.scss';

type InputProps = {
    type?: HTMLInputTypeAttribute,
    variant: 'input' | 'select' | 'textarea',
    name: string,
    required?: boolean,
    defaultValue?: string | number,
    children?: React.ReactNode,
    onChange: (e) => void,
}

export default function Input(props: InputProps){

    if(props.variant === 'input' && !props.type) throw new Error('An input variant must define the type of the input!');
    if(props.variant === 'select' && !props.children) throw new Error('A select element must contain at least one option-child element!');

    return (
        props.variant === 'input' ? 
        <input 
            className={style.input} 
            required={props.required} 
            type={props.type} 
            defaultValue={props.defaultValue}
            onChange={props.onChange}
        />
        :
        props.variant === 'textarea' ?
        <textarea 
            className={style.input} 
            name={props.name} 
            required={props.required} 
            defaultValue={props.defaultValue}
            onChange={props.onChange}
        />
        :
        props.variant === 'select' ? 
        <select className={style.input} name={props.name} onChange={props.onChange}>
            {props.children}
        </select>
        :
        <span>Unsupported input variant: {props.variant}</span>
    );
}