import Form from "../../../../Components/Form";

function ToggleAbleFieldset(props){
    return (
        <Form.Fieldset disabled={props.disabled}>
            {
                props.children
            }
        </Form.Fieldset>
    )
}

export default ToggleAbleFieldset;