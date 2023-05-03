import LoadingSpinner from "./Spinner";
import useImageIds from '../Hooks/useImageIds';
import Gallery from './Gallery';
import { useState } from "react";
import AppModal from "../Modals/AppModal";
import UploadFile from "../Functions/UploadFile";

function PropertyPicturesSection({property_id}){
    const [imageIds, loadImageIds] = useImageIds(`/properties/${property_id}/images`);
    const [showModal, setShowModal] = useState(false);

    return (
        <Gallery title="Kuvat" secondaryTitle="Lisää Kuva" onClickHandler={() => setShowModal(true)}>
            {
                imageIds.map(id => {
                    return (
                        <img 
                            src={`/properties/${property_id}/images/${id}`}
                            width="200px"
                            key={`property-${property_id}-image-${id}`}
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
                            `/properties/${property_id}/images`, () => {
                                setShowModal(false);
                                loadImageIds();
                        });
                    }
                }/>
        </Gallery>
    )
}

export default PropertyPicturesSection;