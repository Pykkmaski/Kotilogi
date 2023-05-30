import {useState} from 'react';
import Gallery from './Gallery';
import ImageCard from './Cards/ImageCard';
import Delete from '../Functions/Delete';
import Update from '../Functions/Update';

function ImagesSection(props){

    const {images, loadImages} = props;
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
        Update(props.updateRoute + `/${selectedImage.current.id}`, body, () => loadImages());
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
        Delete(props.deleteRoute + `/${selectedImage.current.id}`, () => loadImages());
    }

    function uploadImage(e){
        e.preventDefault();
        e.target.submit_button.disabled = true;

        const url = props.uploadRoute;
        const file = e.target.image.files[0];
        const title = e.target.title.value;
        const descr = e.target.description.value;

        console.log(file);
        UploadFile(e.target.image.files[0], title, descr,'image', url, () => loadImages());
        setShowUploadModal(false);

        e.target.submit_button.disabled = false;
    }

    function setMain(image){
        selectedImage.current = image;
        Update(props.mainImageUpdateRoute, selectedImage.current.id, () => loadImages());
    }

    return (
        <Section>
            <Section.Header>
                <div className="label-heading">
                    <span className="label">{property.address}</span>
                    <h1>Kuvat</h1>
                </div>

                <div className="group-row">
                    <EditButton
                        editFunction={() => setEditing(true)}
                        cancelFunction={() => setEditing(false)}
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
                    setShowModal={() => setShowEditModal(true)}
                    onSubmit={updateImageData}
                />

                <ConfirmModal 
                    showModal={showDeleteModal}
                    setShowModal={setShowDeleteModal}
                    title="Poista Kuva"
                    text="Oletko varma että haluat poistaa kuvan?"

                    onCancel={() => setShowConfirmationModal(false)}
                    onConfirm={confirmDelete}
                />
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        {
                            images.map(image => {
                                const element = <ImageCard image={image} editing={editing} functions={{
                                    deleteImage,
                                    updateImage,
                                    setMain,
                                }}
                                />

                                return (
                                    !editing ?
                                    <a className="container-link" href={imgSrc} target="_blank">
                                        {element}
                                    </a>
                                    :
                                    element
                                );
                            })
                        }
                    </Gallery.Body>
                </Gallery>
            </Section.Body>
        </Section>
    )
}

export default ImagesSection;