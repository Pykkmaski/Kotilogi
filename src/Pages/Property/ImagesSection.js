import Gallery from '../../Components/Gallery';
import { useContext, useState, useRef } from "react";
import UploadFile from "../../Functions/UploadFile";
import usePropertyImages from "../../Hooks/usePropertyImages";
import Section from '../../Components/Section';
import Button from '../../Components/Button';
import PropertyContext from '../../Contexts/PropertyContext';
import Img from '../../Components/Image';
import Card from '../../Components/Cards/Card';
import UploadImageModal from '../../Components/Modals/UploadImageModal';
import NoImages from '../../Components/Error/NoImages';
import ImageCard from '../../Components/Cards/ImageCard';

function ImagesSection(props){
    const {property} = useContext(PropertyContext);
    const [images, loadImages] = usePropertyImages(property.id);
    const [showModal, setShowModal] = useState(false);
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
                    <input type="search" placeholder="Etsi kuvia..." onChange={() => null}/>
                    <Button className="primary">Muokkaa</Button>
                    <Button variant="add" className="primary" onClick={() => setShowModal(true)}>Lisää Kuva</Button>
                </div>

                <UploadImageModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    uploadFunction={(e) => {
                        e.preventDefault();
                        const url = `/api/images/properties/${property.id}`;
                        UploadFile(e.target.image.files[0], 'image', url, () => loadImages());
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
                                return (
                                    <a href={imgSrc} target="_blank">
                                        <Gallery.Image src={imgSrc} image={image}/>
                                    </a>
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