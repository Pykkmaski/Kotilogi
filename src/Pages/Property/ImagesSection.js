import Gallery from '../../Components/Gallery';
import { useContext, useState, useRef } from "react";
import UploadFile from "../../Functions/UploadFile";
import usePropertyImages from "../../Hooks/usePropertyImages";
import Section from '../../Components/Section';
import Button from '../../Components/Buttons/Button';
import PropertyContext from '../../Contexts/PropertyContext';
import UploadImageModal from '../../Components/Modals/UploadImageModal';
import NoImages from '../../Components/Error/NoImages';
import ImageCard from '../../Components/Cards/ImageCard';
import EditButton from '../../Components/Buttons/EditButton';
import Update from '../../Functions/Update';
import Delete from '../../Functions/Delete';
import ConfirmModal from '../../Components/Modals/ConfirmModal';
import EditFileInfoModal from '../../Components/Modals/EditFileInfoModal';

function ImagesSection(props){
    const {property, loadProperty} = useContext(PropertyContext);
    const [images, loadImages] = usePropertyImages(property.id);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmationModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [imageToBeDeleted, setImageToBeDeleted] = useState(null);
    const noImage = './img/no-pictures';
    
    const selectedImages = useRef([]);

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
                    <Button variant="add" className="primary" onClick={() => setShowModal(true)}>Lisää Kuva</Button>
                </div>

                <UploadImageModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    uploadFunction={(e) => {
                        e.preventDefault();
                        e.target.submit_button.disabled = true;

                        const url = `/api/images/properties/${property.id}`;
                        const file = e.target.image.files[0];
                        const title = e.target.title.value;
                        const descr = e.target.description.value;

                        console.log(file);
                        UploadFile(e.target.image.files[0], title, descr,'image', url, () => loadImages());
                        setShowModal(false);

                        e.target.submit_button.disabled = false;
                    }}
                />

                <EditFileInfoModal
                    showModal={false}
                    setShowModal={() => null}
                    onSubmit={(e) => {
                        e.preventDefault();
                        
                    }}
                />

                <ConfirmModal 
                    showModal={showConfirmDeleteModal}
                    setShowModal={setShowConfirmationModal}
                    title="Poista Kuva"
                    text="Oletko varma että haluat poistaa kuvan?"

                    onCancel={() => setShowConfirmationModal(false)}
                    onConfirm={() => {
                        Delete(`/api/images/properties/${imageToBeDeleted}`, () => loadImages());
                        setShowConfirmationModal(false);
                    }}
                />
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        {
                            images.length ? 
                            images.map(image => {
                                const imgSrc = `/api/images/properties/image/${image.id}`;
                                const element = <ImageCard src={imgSrc} image={image} editing={editing} functions={{
                                    deleteImage: (image_id) => {
                                        setImageToBeDeleted(image_id),
                                        setShowConfirmationModal(true)
                                    },
                                    setAsMain: (image_id) => Update(`/api/images/properties/${property.id}/main/${image_id}`, image_id, () => loadImages()),
                                }}/>

                                return (
                                    !editing ?
                                    <a className="container-link" href={imgSrc} target="_blank">
                                        {element}
                                    </a>
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