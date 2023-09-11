import Form from "kotilogi-app/components/Form";

type AddModalBodyContentProps = {
    contentType: FileGallery.ContentType,
}

export default function AddModalBodyContent(props: AddModalBodyContentProps){
    return (
        <Form>
            <Form.Group>
                <label>Otsikko</label>
                <input name="title"></input>
                <Form.SubLabel>Anna vaihtoehtoinen otsikko. Jos tätä ei anneta, käytetään tiedostonimeä.</Form.SubLabel>
            </Form.Group>

            <Form.Group>
                <label>Kuvaus</label>
                <textarea name="description"></textarea>
                <Form.SubLabel>Anna vaihtoehtoinen kuvaus.</Form.SubLabel>
            </Form.Group>

            <Form.Group>
                <label>Tiedosto:</label>
                <input type="file" name="file" accept={props.contentType} required={true}></input>
            </Form.Group>
        </Form>
    );
}