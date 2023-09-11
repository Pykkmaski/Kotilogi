import Form from "kotilogi-app/components/Form";

export default function DescriptionFragment(){
    return (
        <Form.Group>
            <label>Kuvaus</label>
            <textarea name="description"></textarea>
            <Form.SubLabel>Anna vaihtoehtoinen kuvaus.</Form.SubLabel>
        </Form.Group>
    );
}