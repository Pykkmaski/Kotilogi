import useSubComponents from "../Hooks/useSubComponents";
import LoadingSpinner from "./Spinner";

function Form(props){
    const subComponents = useSubComponents(Object.keys(Form), props);
    return (
        <form onSubmit={props.onSubmit}>
            {
                subComponents.map((component) => component)
            }
        </form>
    )
}

const Header = (props) => <div className="form-header">{props.children}</div>
Form.Header = Header;

const Label = (props) => <label className="form-label">{props.children}</label>
Form.Label = Label;

const Control = (props) => <input className="form-input" type={props.type} disabled={props.disabled} name={props.name}/>
Form.Control = Control;

const Group = (props) => <div className="form-group">{props.children}</div>
Form.Group = Group;

const ButtonGroup = (props) => <div className="form-button-group">{props.children}</div>
Form.ButtonGroup = ButtonGroup;

const Error = (props) => <div className="form-error">{props.children}</div>
Form.Error = Error;

const Spinner = (props) => <LoadingSpinner size={props.size} mesage={props.message}/>
Form.Spinner = Spinner;

export default Form;

