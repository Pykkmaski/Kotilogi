import Form from "kotilogi-app/components/Form"
import DescriptionFragment from "../ModalFragments/DescriptionFragment"
import ButtonsFragment from "../ModalFragments/ButtonsFragment"

type AddModalBodyContentProps = {
    titleInputLabel: string,
    titleInputName: string,
    onSubmitHandler: (e) => void,
}

export default function AddModalBodyContent(props: AddModalBodyContentProps){
    return (
        <Form onSubmit={props.onSubmitHandler}>
            <Form.Group>
                <label>{props.titleInputLabel}</label>
                <input type="text" name={props.titleInputName} required></input>
            </Form.Group>

            <DescriptionFragment/>
            <ButtonsFragment/>
        </Form>
    );
}