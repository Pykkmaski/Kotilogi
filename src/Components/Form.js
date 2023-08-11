import useSubComponents from "../Hooks/useSubComponents";
import LoadingSpinner from "./Spinner";
import useClassName from "../Hooks/useClassName";

function Form(props){
    const {className} = useClassName(null, props.className);
    const subComponents = useSubComponents(Object.keys(Form), props);
    
    return (
        <form className={className} onSubmit={props.onSubmit} id={props.id}>
            {
                props.children
            }
        </form>
    )
}

const Header = (props) => <div className="form-title">{props.children}</div>
Form.Header = Header;

const Label = (props) => <label className="form-label">{props.children}</label>
Form.Label = Label;

const SubLabel = (props) => <div className="sub-label">{props.children}</div>
Form.SubLabel = SubLabel;

const Control = (props) => {
    if(props.type === 'select'){
        const subComponents = useSubComponents(Object.keys(Control), props);

        return (
            <select name={props.name} disabled={props.disabled} id={props.id}>
                {
                   props.children
                }
            </select>
        )
    }
    else if(props.type === 'textarea'){
        return <textarea disabled={props.disabled} name={props.name} defaultValue={props.defaultValue} required={props.required} maxLength={props.maxLength} id={props.id}/>
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
            onInput={props.onInput}
            id={props.id}
        />
    }
}
Form.Control = Control;

const Fieldset = (props) => <fieldset disabled={props.disabled}>{props.children}</fieldset>
Form.Fieldset = Fieldset;

const Legend = (props) => <legend>{props.children}</legend>
Form.Legend = Legend;

const Option = (props) => <option value={props.value} selected={props.selected}>{props.children}</option>
Form.Option = Option;

const Group = (props) => <div className="form-group">{props.children}</div>
Form.Group = Group;

const ButtonGroup = (props) => <div className="form-button-group">{props.children}</div>
Form.ButtonGroup = ButtonGroup;

const Error = (props) => <div className="form-error">{props.children}</div>
Form.Error = Error;

const Success = (props) => <div className="form-success">{props.children}</div>
Form.Success = Success;

const BooleanSelector = (props) => <select name={props.name} disabled={props.disabled}>
    <option value="" disabled={true} selected={true}>Valitse</option>
    <option value="true" selected={true}>Kyllä</option>
    <option value="false">Ei</option>
</select>
Form.BooleanSelector = BooleanSelector;

const Spinner = (props) => <LoadingSpinner size={props.size} message={props.message}/>
Form.Spinner = Spinner;

export default Form;

