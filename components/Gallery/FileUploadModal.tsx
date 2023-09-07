import { useState } from "react";
import Form from "../Form";
import Modal from "../Modals/Modal";

type AcceptedFileTypes = 'image/jpeg' | 'application/pdf';

type FileUploadModalProps = {
    headerText: string,
    accept: AcceptedFileTypes,
    show: boolean,
    onHide: () => any,
}

export default function FileUploadModal(props: FileUploadModalProps){

    const [data, setData] = useState({});

    const onChangeHandler = (e) => {
        setData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        });
    }

    return (
        <Modal onHide={props.onHide} show={props.show}>
            <Modal.Header>{props.headerText}</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <label>Otsikko</label>
                        <input name="title" onChange={onChangeHandler}></input>
                    </Form.Group>

                    <Form.Group>
                        <label>Kuvaus</label>
                        <textarea name="description" onChange={onChangeHandler}></textarea>
                    </Form.Group>

                    <Form.Group>
                        <label>Tedosto</label>
                        <input type="file" required accept={props.accept} name="file"></input>
                    </Form.Group>

                    <Form.ButtonGroup>
                        <button className="secondary" type="button">Peruuta</button>
                        <button className="primary" type="submit">Lähetä</button>
                    </Form.ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
}