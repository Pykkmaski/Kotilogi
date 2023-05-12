import {useContext, useState} from 'react';
import EventContext from '../../Contexts/EventContext';
import useEventImages from '../../Hooks/useEventImages';
import Gallery from '../../Components/Gallery';
import Section from '../../Components/Section';
import Button from '../../Components/Button';
import Image from '../../Components/Image';
import UploadFile from '../../Functions/UploadFile';
import UploadImageModal from '../../Modals/UploadImageModal';
import Modal from '../../Components/Modal';
import NoImages from '../../Components/Error/NoImages';

function ImagesSection(props){

    const {event} = useContext(EventContext);
    const [images, loadImages] = useEventImages(event.id);
    const [showModal, setShowModal] = useState(false);

    return (
        <Section>
            <Section.Header>
                <h1>Kuvat</h1>
                <div className="group-row">
                    <Button variant="add" className="primary" title="Lisää Kuva" onClick={() => setShowModal(true)}/>
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
                            images.map(id => {
                                const imgSrc = `/api/images/events/image/${id}`;
                                return (
                                    <Image src={imgSrc} loading="lazy" onError={(e) => e.target.src = './img/no-pictures.png'}>
                    
                                    </Image>
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