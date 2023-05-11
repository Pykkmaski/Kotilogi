import {useContext, useState} from 'react';
import EventContext from '../../Contexts/EventContext';
import useEventImages from '../../Hooks/useEventImages';
import Gallery from '../../Components/Gallery';
import Section from '../../Components/Section';
import Button from '../../Components/Button';
import Image from '../../Components/Image';
import UploadFile from '../../Functions/UploadFile';
import UploadImageModal from '../../Modals/UploadImageModal';

function ImagesSection(props){

    const {event, setShowUploadImageModal} = useContext(EventContext);
    const [images, loadImages] = useEventImages(event.id);
    const [showModal, setShowModal] = useState(false);

    return (
        <Section>
            <Section.Header>
                <h1>Kuvat</h1>
                <div className="group-row">
                    <input type="search" placeholder="Etsi Kuvia..."/>
                    <Button variant="add" className="primary" title="Lisää Kuva" onClick={() => setShowUploadImageModal(true)}/>
                </div> 
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        {
                            images.map(id => {
                                const imgSrc = `/api/images/events/image/${id}`;
                                return (
                                    <Image src={imgSrc} loading="lazy" onError={(e) => e.target.src = './img/no-pictures.png'}>
                    
                                    </Image>
                                )
                            })
                        }
                    </Gallery.Body>
                </Gallery>
            </Section.Body>
        </Section>
    )
}

export default ImagesSection;