import { CSSProperties } from "react"

const containerStyle: CSSProperties = {
    display: 'flex',
    width: '100%',
    borderRadius: '10px',
    border: '1px solid #DDD',
}

const labelStyle: CSSProperties = {
    width: '20%',
    background: '#DDD',
    color: 'black',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    paddingLeft: '0.5rem',
}

const inputStyle: CSSProperties = {
    flex: 1,
    borderBottom: 'none',
    paddingLeft: '0.5rem',
}

type InputProps = React.ComponentProps<'input'> & {
    label: string,
}

export function Input(props: InputProps){
    return (
        <div style={containerStyle}>
            <div style={labelStyle}>{props.label}</div>
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
            <div style={labelStyle}>{props.label}</div>
            <select style={inputStyle} {...props}>
                {props.children}
            </select>
        </div>
    );
}