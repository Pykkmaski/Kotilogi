
type LabelProps = React.ComponentProps<'label'> & {
    required: boolean,
}

/**A conveniency component for defining labels in forms. Adds a red star automatically after the label contents if the required-prop is true. */
export function Label({children, ...props}: LabelProps){
    return (
        <label {...props}>{children} {props.required ? <span className="danger">*</span> : null}</label>
    );
}