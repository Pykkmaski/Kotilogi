import LoadingSpinner from "./Spinner";
import useImageIds from '../Hooks/useImageIds';
import Gallery from './Gallery';
import { useState } from "react";
import AppModal from "../Modals/AppModal";
import UploadFile from "../Functions/UploadFile";
import usePropertyImages from "../Hooks/usePropertyImages";

function PropertyPicturesSection({property_id}){
    const [images, loadImages] = usePropertyImages(property_id);
    const [showModal, setShowModal] = useState(false);
    const noImage = './img/no-pictures';
    
    return (
        <Gallery title="Kuvat" buttonTitle="Lisää Kuva" onClickHandler={() => setShowModal(true)}>
            {
                images.map(id => {
                    return (
                        <img 
                            src={`/api/images/properties/image/${id}`}
                            width="200px"
                            key={`property-${property_id}-image-${id}`}
                            onError={(e) => {
                                e.target.src = {noImage}
                            }}
                        />
                    )
                })
            }
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
        </Gallery>
    )
}

export default PropertyPicturesSection;