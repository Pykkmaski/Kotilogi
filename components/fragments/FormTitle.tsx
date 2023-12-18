import Form from "../Form/Form";

export default function FormTitle(props: FormFragmentProps & {titleAlias?: string, nameAlias?: string}){
    return (
        <Form.Group>
            <label>{props.titleAlias || 'Otsikko'}</label>
            <input name={props.nameAlias || 'title'} onChange={props.onChangeHandler}></input>
        </Form.Group>
    );
}