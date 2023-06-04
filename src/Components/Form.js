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

const SubLabel = (props) => <div className="form-sub-label">{props.children}</div>
Form.SubLabel = SubLabel;

const Control = (props) => {
    if(props.type === 'textarea'){
        return <textarea disabled={props.disabled} name={props.name} defaultValue={props.defaultValue} required={props.required}/>
    }
    else{
        return <input 
            className="form-input" 
            type={props.type} 
            disabled={props.disabled} 
            name={props.name} 
            accept={props.accept} 
            defaultValue={props.defaultValue}
            placeholder={props.placeholder}
            required={props.required}
            min={props.min}
            max={props.max}
            step={props.step}
        />
    }
}
Form.Control = Control;

const Group = (props) => <div className="form-group">{props.children}</div>
Form.Group = Group;

const ButtonGroup = (props) => <div className="form-button-group">{props.children}</div>
Form.ButtonGroup = ButtonGroup;

const Error = (props) => <div className="form-error">{props.children}</div>
Form.Error = Error;

const BooleanSelector = (props) => <select name={props.name} disabled={props.disabled}>
    <option value="" disabled={true} selected={true}>Valitse</option>
    <option value="true" selected={true}>Kyllä</option>
    <option value="false">Ei</option>
</select>
Form.BooleanSelector = BooleanSelector;

const Spinner = (props) => <LoadingSpinner size={props.size} mesage={props.message}/>
Form.Spinner = Spinner;

export default Form;

