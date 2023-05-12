import Gallery from '../../Components/Gallery';
import { useContext, useState, useRef } from "react";
import UploadFile from "../../Functions/UploadFile";
import usePropertyImages from "../../Hooks/usePropertyImages";
import Section from '../../Components/Section';
import Button from '../../Components/Button';
import PropertyContext from '../../Contexts/PropertyContext';
import Img from '../../Components/Image';
import Card from '../../Components/Card';
import UploadImageModal from '../../Modals/UploadImageModal';
import NoImages from '../../Components/Error/NoImages';

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
                    <Button title="Lisää Kuva" variant="add" className="primary" onClick={() => setShowModal(true)}/>
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
                            images.map(id => {
                                const imgSrc = `/api/images/properties/image/${id}`;
                                return (
                                    <Img 
                                        src={imgSrc}
                                    >
                                        <Img.Controls>
                                            <button className="primary">Poista</button>
                                        </Img.Controls>
                                    </Img>
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