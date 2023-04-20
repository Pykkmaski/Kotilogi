import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import 'bootstrap/scss/bootstrap.scss';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormData from 'form-data';

import './Style.scss';

const plusIcon = './img/plus.png';

function Event(propes){

    const {event_id, property_id} = useParams();
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState(null);
    const [showImageUploadModal, setShowImageUploadModal] = useState(false);
    const [showUploadPdfModal, setShowUploadPdfModal] = useState(false);
    const [showSelectedImageModal, setShowSelectedImageModal] = useState(false);
    const [imageIds, setImageIds] = useState([]);
    const [selectedImageId, setSelectedImageId] = useState(null);

  
    function loadImageIds(){
        axios.get(`/images/ids/property/${property_id}/events/${event_id}`).then(res => {
            setImageIds(res.data);
        })
        .catch(err => {
            console.log(err.response.status);
        });
    }

    function loadEvent(){
        setLoading(true);

        axios.get(`/property/${property_id}/events/${event_id}`).then(res => {
            setEvent(res.data);
            loadImageIds();
        })
        .catch(err => {
            console.log(err.response.status);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    

    function uploadImage(e){
        e.preventDefault();
        const img = e.target.image.files[0];
        const data = new FormData();
        data.append('image', img);

        axios.post(`/images/property/${property_id}/events/${event_id}`, data, {
            headers : {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        })
        .then(res => {
            loadEvent();
        })
        .catch(err => {
            console.log(err.response.status);
        })
        .finally(() => {
            setShowImageUploadModal(false);
        })
    }

    function uploadPdf(e){
        e.preventDefault();
        const pdf = e.target.file.files[0];
        const data = new FormData();
        data.append('file', pdf);

        axios.post(`/files/property/${ev.property_id}/events/${ev.id}`, data, {
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

    function openImageModal(id){
        setSelectedImageId(id);
        setShowSelectedImageModal(true);
    }

    useEffect(() => {
        loadEvent();
     }, []);

    if(loading) return <Loading message="Ladataan tapahtumaa..."/>

    return (
        <div id="event-page">
            <div id="back-link-container">
                <a href={`/#/property/${property_id}`}>Takaisin Taloon</a>
            </div>
            <header id="event-page-header">
                <img id="event-main-image" src={`/images/property/${event.property_id}/events/${event.id}/main`}/>
                <div id="event-page-header-body">
                    <h1>{event.name}</h1>
                    <p>
                        {
                            event.description
                        }
                    </p>
                </div>
            </header>

            <div id="event-page-images">
                <header id="event-page-images-header">
                    <h1>Kuvat</h1>
                </header>

                <div id="event-page-images-body">
                    <div id="add-image-card" onClick={() => setShowImageUploadModal(true)}>
                        <div className="icon-container">
                            <img src={plusIcon}/>
                        </div>
                        <span>Lisää Kuva</span>
                        <input type="file" accept="image/jpeg" name="image" hidden id="image-input"></input>
                    </div>

                    {
                        imageIds.map(id => {
                            const element = (
                                <div className="image-card" onClick={() => openImageModal(id)}>
                                    <img src={`/images/property/${property_id}/${id}`}/>
                                </div>
                            )

                            return element;
                        })
                    }
                </div>
                
            </div>

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
                
            </div>

            <Modal show={showImageUploadModal} centered onHide={() => setShowImageUploadModal(false)}>
                <Modal.Header closeButton>
                    Lataa Kuva
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={uploadImage}>
                        <Form.Group className="w-100">
                            <Form.Control type="file" accept="image/jpeg" name="image"></Form.Control>
                        </Form.Group>

                        <Form.Group className="w-100 d-flex flex-row justify-content-between gap-1">
                            <Button variant="secondary" onClick={() => setShowImageUploadModal(false)}>Peruuta</Button>
                            <Button variant="primary" type="submit">Lähetä</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>

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

            <Modal centered onHide={() => setShowSelectedImageModal(false)} show={showSelectedImageModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <img className="big-image" src={`/images/property/${property_id}/${selectedImageId}`}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSelectedImageModal(false)}>Sulje</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Event;