import Form from "kotilogi-app/components/Form";
import DescriptionFragment from "../ModalFragments/DescriptionFragment";
import ButtonsFragment from "../ModalFragments/ButtonsFragment";

type AddModalBodyContentProps = HasPropertyId;

export default function AddModalBodyContent(props: AddModalBodyContentProps){

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const newEvent = {
            title: e.target.title.value,
            description: e.target.description.value,
            property_id: props.property_id
        }
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group>
                <label>Otsikko</label>
                <input name="title" required></input>
            </Form.Group>

            <DescriptionFragment/>
            <ButtonsFragment/>
        </Form>
    )
}