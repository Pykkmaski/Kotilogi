import {useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import Gallery from './Gallery';
import ImageCard from './Cards/ImageCard';
import Delete from '../Functions/Delete';
import Update from '../Functions/Update';
import NoImages from './Error/NoImages';
import UploadImageModal from './Modals/UploadImageModal';
import ConfirmModal from './Modals/ConfirmModal';
import EditFileInfoModal from './Modals/EditFileInfoModal';
import Section from './Section';
import EditButton from './Buttons/EditButton';
import Button from './Buttons/Button';
import UploadFile from '../Functions/UploadFile';

function ImagesSection(props){
    const {images, loadImages, loadTarget} = props;
    const [editing, setEditing] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const selectedImage = useRef(null);

    function updateImageData(e){
        e.preventDefault();
        const body = {
            title: e.target.title.value,
            description: e.target.description.value,
        }
        const url = props.baseUrl + '/' + props.target.id + '/image/' + selectedImage.current.id;
        Update(url, body, () => loadImages());
        setShowEditModal(false);
    }

    function deleteImage(image){
        selectedImage.current = image;
        setShowDeleteModal(true);
    }

    function updateImage(image){
        selectedImage.current = image;
        setShowEditModal(true);
    }

    function confirmDelete(){
        const url = props.baseUrl + '/image/' + selectedImage.current.id;
        Delete(url, () => loadImages());
        setShowDeleteModal(false);
    }

    function uploadImage(e){
        e.preventDefault();
        e.target.submit_button.disabled = true;

        const url = props.baseUrl + `/${props.target.id}`;
        const file = e.target.image.files[0];
        const title = e.target.title.value;
        const descr = e.target.description.value;

        UploadFile(file, title, descr,'image', url, () => loadImages());
        setShowUploadModal(false);

        e.target.submit_button.disabled = false;
    }

    function setMain(image){
        selectedImage.current = image;
        const url = props.baseUrl + '/' + props.target.id + '/image/main/';
        Update(url, {image_id: selectedImage.current.id}, () => loadImages());
        loadTarget();
    }

    return (
        <Section>
            <Section.Header>
                <div className="label-heading">
                    {
                       props.target.address ? <span className="label">{props.target.address}</span> : null
                    }
                    
                    <h1>Kuvat</h1>
                </div>

                <div className="group-row">
                    <EditButton
                        editFunction={() => setEditing(true)}
                        cancelFunction={() => setEditing(false)}
                        hidden={images.length === 0}
                    >Muokkaa</EditButton>
                    <Button variant="add" className="primary" onClick={() => setShowUploadModal(true)}>Lisää Kuva</Button>
                </div>

                <UploadImageModal
                    showModal={showUploadModal}
                    setShowModal={setShowUploadModal}
                    uploadFunction={uploadImage}
                />

                <EditFileInfoModal
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                    onSubmit={updateImageData}
                />

                <ConfirmModal 
                    showModal={showDeleteModal}
                    setShowModal={setShowDeleteModal}
                    title="Poista Kuva"
                    text="Oletko varma että haluat poistaa kuvan?"

                    onCancel={() => setShowDeleteModal(false)}
                    onConfirm={confirmDelete}
                />
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body className={images.length === 0 ? 'empty' : null}>
                        {
                            images.length ?
                            images.map(image => {
                                
                                const imgSrc = props.baseUrl + `/image/${image.id}`;

                                const element = <ImageCard image={image} src={imgSrc} editing={editing} functions={{
                                    deleteImage,
                                    updateImage,
                                    setMain,
                                }}
                                />

                                return (
                                    !editing ?
                                    <Link className="container-link" to={imgSrc} target="_blank">
                                        {element}
                                    </Link>
                                    :
                                    element
                                );
                            })
                            :
                            <NoImages/>
                        }
                    </Gallery.Body>
                </Gallery>
            </Section.Body>
        </Section>
    )
}

export default ImagesSection;