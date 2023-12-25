import { CSSProperties } from "react"

const containerStyle: CSSProperties = {
    display: 'flex',
    width: '100%',
    borderRadius: '10px',
    border: '1px solid #DDD',
}

const inputStyle: CSSProperties = {
    flex: 1,
    borderBottom: 'none',
    paddingLeft: '0.5rem',
    backgroundColor: 'white',
}

function Label(props: {
    text: string,
    required?: boolean,
}){
    const labelStyle: CSSProperties = {
        minWidth: '20%',
        background: '#DDD',
        color: 'black',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        paddingLeft: '0.5rem',
        backgroundColor: 'var(--primary-color)',
    }

    const requiredBadge = props.required ? <i style={{color: 'red'}}>*</i> : null;

    return <div style={labelStyle}>{props.text} {requiredBadge}</div>
}

type InputProps = React.ComponentProps<'input'> & {
    label: string,
}

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