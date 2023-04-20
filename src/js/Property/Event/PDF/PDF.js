const plusIcon = './img/plus.png';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormData from 'form-data';
import {useState} from 'react';
import axios from 'axios';
import './Style.scss';
import { useParams } from 'react-router-dom';

function PDF(props){

    const [showUploadPdfModal, setShowUploadPdfModal] = useState(false);
    const {property_id, event_id} = useParams();

    function uploadPdf(e){
        e.preventDefault();
        const pdf = e.target.file.files[0];
        const data = new FormData();
        data.append('file', pdf);

        axios.post(`/files/property/${property_id}/events/${event_id}`, data, {
            headers : {
                'Content-Type' : `multipart/form-data; boundary=${data._boundary}`,
            }
        })
        .then(res => {
            loadEvent();
        })
        .catch(err => {
            console.log(err.response.status);
        });
    }

    return (
        <div id="event-page-pdf">
            <h1>PDF</h1>
            <div id="event-page-pdf-body">
                <div id="add-pdf-card" onClick={() => setShowUploadPdfModal(true)}>
                    <div className="icon-container">
                        <img src={plusIcon}/>
                    </div>
                    <span>Lisää Kuva</span>
                    <input type="file" accept="application/pdf" name="pdf" hidden id="image-input"></input>
                </div>
            </div>

            <Modal show={showUploadPdfModal} centered onHide={() => setShowUploadPdfModal(false)}>
                <Modal.Header closeButton>
                    Lataa PDF
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={uploadPdf}>
                        <Form.Group className="w-100">
                            <Form.Control type="file" accept="application/pdf" name="file"></Form.Control>
                        </Form.Group>

                        <Form.Group className="w-100 d-flex flex-row gap-1">
                            <Button variant="secondary" onClick={() => setShowUploadPdfModal(false)}>Peruuta</Button>
                            <Button variant="primary" type="submit">Lähetä</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
 
        </div>
    )
}

export default PDF;