import LoadingSpinner from "../Spinner/Spinner";

function Form({children, ...props}: React.ComponentProps<'form'>){
    return (
        <form {...props} >
            {
                children
            }
        </form>
    )
}

const Header = (props) => <div className='form-title'>{props.children}</div>
Form.Header = Header;

const Label = (props) => <label className='form-label'>{props.children}</label>
Form.Label = Label;

const SubLabel = (props) => <div className='sub-label'>{props.children}</div>
Form.SubLabel = SubLabel;

export const Group = (props: React.ComponentProps<'div'> & {
    /**
     * Are the elements distributed horizontally or vertically?
     */
    direction?: 'horizontal' | 'vertical'
}) => {
    const direction = props.direction || 'vertical';
    const baseClassName = `form-group ${direction}`;
    const finalClassName = props.className ? `${props.className} ${baseClassName}` : baseClassName;

    return (
        <div className={finalClassName} key={props.key} hidden={props.hidden}>{props.children}</div>
    );
}

Form.Group = Group;

const ButtonGroup = (props) => <div className="form-button-group">{props.children}</div>
Form.ButtonGroup = ButtonGroup;

const Error = (props) => <div className='form-error'>{props.children}</div>
Form.Error = Error;

const Success = (props) => <div className='form-success'>{props.children}</div>
Form.Success = Success;

const Spinner = (props) => <LoadingSpinner size={props.size} message={props.message}/>
Form.Spinner = Spinner;

export default Form;