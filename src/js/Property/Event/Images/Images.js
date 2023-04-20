import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormData from 'form-data';
import axios from 'axios';
const plusIcon = './img/plus.png';

import './Style.scss';

function Images(props){

    const {property_id, event_id} = useParams();
    const [imageIds, setImageIds] = useState([]);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [showSelectedImageModal, setShowSelectedImageModal] = useState(false);
    const [showImageUploadModal, setShowImageUploadModal] = useState(false);

    function loadImageIds(){
        axios.get(`/images/ids/property/${property_id}/events/${event_id}`).then(res => {
            setImageIds(res.data);
        })
        .catch(err => {
            console.log(err.response.status);
        });
    }

    function openImageModal(id){
        setSelectedImageId(id);
        setShowSelectedImageModal(true);
    }

    function loadImages(){
        axios.get(`/property/${property_id}/events/${event_id}`).then(res => {
            loadImageIds();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
        })
    }

    function deleteSelectedImage(){
        axios.delete(`/images/property/${property_id}/${selectedImageId}`).then(res => {
            setShowSelectedImageModal(false);
            loadImageIds();
        })
        .catch(err => {
            console.log(err);
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
            loadImages();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setShowImageUploadModal(false);
        })
    }

    useEffect(() => {
        loadImageIds();
    }, []);

    return (
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

            <Modal centered onHide={() => setShowSelectedImageModal(false)} show={showSelectedImageModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <img className="big-image" src={`/images/property/${property_id}/${selectedImageId}`}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSelectedImageModal(false)}>Sulje</Button>
                    <Button variant="danger" onClick={() => deleteSelectedImage()}>Poista</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Images;