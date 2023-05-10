import Gallery from './Gallery';
import { useState } from "react";
import AppModal from "../Modals/AppModal";
import UploadFile from "../Functions/UploadFile";
import usePropertyImages from "../Hooks/usePropertyImages";
import Section from './Section';
import Button from './Button';

function PropertyPicturesSection({property_id}){
    const [images, loadImages] = usePropertyImages(property_id);
    const [showModal, setShowModal] = useState(false);
    const noImage = './img/no-pictures';
    
    return (
        <Section>
            <Section.Header>
                <h1>Kuvat</h1>
                <div className="group-row">
                    <input type="search" placeholder="Etsi kuvia..." onChange={() => null}/>
                    <Button title="Lisää Kuva" variant="add" className="primary" onClick={() => setShowModal(true)}/>
                </div>

                <AppModal 
                variant="upload/image" 
                setShowModal={setShowModal} 
                showModal={showModal}
                uploadFunction={
                    (e) => {
                        e.preventDefault();
                        const dest = {
                            property_id,
                            route: 'images'
                        }
                        UploadFile(
                            e.target.image.files[0], 
                            'image', 
                            `/api/images/properties/${property_id}`, () => {
                                setShowModal(false);
                                loadImages();
                        });
                    }
                }/>
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        {
                            images.map(id => {
                                return (
                                    <img 
                                        className="gallery-image"
                                        src={`/api/images/properties/image/${id}`}
                                        key={`property-${property_id}-image-${id}`}
                                        width="200px"
                                        onError={(e) => {
                                            e.target.src = {noImage}
                                        }}
                                    />
                                )
                            })
                        }
                    </Gallery.Body>
                </Gallery>
            </Section.Body>
        </Section>
        
    )
}

export default PropertyPicturesSection;