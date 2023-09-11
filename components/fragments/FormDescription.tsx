import Form from "../Form"

export default function FormDescription(props: FormFragmentProps){
    return (
        <Form.Group>
            <label>Kuvaus</label>
            <input name="description" onChange={props.onChangeHandler}></input>
        </Form.Group>
    );
}