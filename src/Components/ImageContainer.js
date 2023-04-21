import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Modal from '../Modals/AppModal';
import FormData from 'form-data';
import axios from 'axios';
import AddButton from './AddButton';

function ImageContainer({loadEvent}){

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

    function setSelectedImageAsMain(){
        axios.post(`/images/property/${property_id}/events/${event_id}/${selectedImageId}/main`).then(res => {
            setShowSelectedImageModal(false);
            //Reload entire event for changes to become visible
            loadEvent();
        })
        .catch(err => console.log(err.message));
    }

    useEffect(() => {
        loadImageIds();
    }, []);

    return (
        <div className="d-flex flex-column">
            <header className="images-header">
                <h1>Kuvat</h1>
            </header>

            <div className="images-body">

                <AddButton onClickHandler={() => setShowImageUploadModal(true)}>
                    <span>Lisää Kuva</span>
                </AddButton>

                {
                    imageIds.map(imageId => {
                        const element = (
                            <div className="image-card" onClick={() => openImageModal(imageId)}>
                               <img src={`/images/property/${property_id}/${imageId}`}/>
                            </div>
                        )

                        return element;
                    })
                }
            </div>
            
            <Modal showModal={showImageUploadModal} setShowModal={setShowImageUploadModal} variant="upload/image" uploadFunction={uploadImage}/>
            <Modal 
                showModal={showSelectedImageModal} 
                setShowModal={setShowSelectedImageModal} 
                variant="show/image" 
                deleteSelectedImage={deleteSelectedImage} 
                setSelectedImageAsMain={setSelectedImageAsMain}
                event_id={event_id}
                property_id={property_id}
                selectedImageId={selectedImageId}/>
            
        </div>
    )
}

export default ImageContainer;