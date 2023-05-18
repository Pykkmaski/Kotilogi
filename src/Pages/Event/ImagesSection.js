import {useContext, useState, useRef} from 'react';
import EventContext from '../../Contexts/EventContext';
import useEventImages from '../../Hooks/useEventImages';
import Gallery from '../../Components/Gallery';
import Section from '../../Components/Section';
import Button from '../../Components/Buttons/Button';
import EditButton from '../../Components/Buttons/EditButton';

import Image from '../../Components/Image';
import UploadFile from '../../Functions/UploadFile';
import UploadImageModal from '../../Components/Modals/UploadImageModal';
import NoImages from '../../Components/Error/NoImages';
import SetEventMainImage from '../../Functions/SetEventMainImage';
import ShowImageModal from '../../Components/Modals/ShowImageModal';
import ImageCard from '../../Components/Cards/ImageCard';

function ImagesSection(props){

    const {event, loadEvent} = useContext(EventContext);
    const [images, loadImages] = useEventImages(event.id);
    const [showModal, setShowModal] = useState(false);
    const [showShowImageModal, setShowImageModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const selectedImage = useRef(null);

    function displayImage(id){
        console.log(id);
        
    }
    return (
        <Section>
            <Section.Header>
                <h1>Kuvat</h1>
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
                        const url = `/api/images/events/${event.id}`;
                        UploadFile(e.target.image.files[0], 'image', url, () => loadImages());
                        setShowModal(false);
                    }}
                />

            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        {
                            images.length ?
                            images.map(image => {
                                const imgSrc = `/api/images/events/image/${image.id}`;
                                const element = <ImageCard image={image} src={imgSrc} editing={editing} functions={{
                                    deleteImage: () => null,
                                    setAsMain: (image_id) => Update(`/api/images/events/${event.id}/main`, image_id, () => loadImages())
                                }}
                                />

                                return (
                                    !editing ?
                                    <a href={imgSrc} target="_blank">
                                        {element}
                                    </a>
                                    :
                                    element
                                )
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