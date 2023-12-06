import Form from "kotilogi-app/components/Form";
import { SetStateAction } from "react";
import ContentSectionHeader from "./ContentSectionHeader";
import ContentSectionBody from "./ContentSectionBody";

export default function Body(props: {
    formId: string,
    onSubmitHandler: (e) => Promise<void>,
    event: any,
    setContentSection: React.Dispatch<SetStateAction<'images' | 'files'>>,
    contentSection: 'images' | 'files',
}){

    return (
        <div className="edit-modal-body">
            <div className="description-section">
                <Form id={props.formId} onSubmit={props.onSubmitHandler}>
                    <Form.Group>
                        <label>Otsikko <span className="danger">*</span></label>
                        <input name="title" required={true} placeholder="Kirjoita otsikko..." defaultValue={props.event?.title}/>
                    </Form.Group>

                    <Form.Group>
                        <label>Päivämäärä</label>
                        <input type="date" defaultValue={props.event?.time} name="time"/>
                        <Form.SubLabel>Anna vaihtoehtoinen päivämäärä. Suositeltu.</Form.SubLabel>
                    </Form.Group>

                    <Form.Group>
                        <label>Kuvaus</label>
                        <textarea name="description" placeholder="Kirjoita kuvaus..." defaultValue={props.event?.description}/>
                        <Form.SubLabel>Anna tapahtumalle vaihtoehtoinen kuvaus.</Form.SubLabel>
                    </Form.Group>
                </Form>
            </div>

            <div className="content-section">
                <ContentSectionHeader setContentSection={props.setContentSection}/>
                <ContentSectionBody contentSection={props.contentSection}/>
            </div>
        </div>
    )
}