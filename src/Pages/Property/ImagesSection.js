import { useContext } from "react";
import usePropertyImages from "../../Hooks/usePropertyImages";
import PropertyContext from '../../Contexts/PropertyContext';
import ImageSection from '../../Components/ImagesSection';

function ImagesSection(props){
    const {property, loadProperty} = useContext(PropertyContext);
    const [images, loadImages] = usePropertyImages(property.id);

    return (
        <ImageSection
            target={property}
            images={images}
            loadImages={loadImages}
            baseUrl={'/api/images/properties'}
            uploadRoute={`/api/images/properties/${property.id}`}
            deleteRoute={`/api/images/properties/${property.id}/image`}
            updateRoute={`/api/images/properties/${property.id}/image`}
            mainImageUpdateRoute={`/api/images/properties/${property.id}/main`}
        />
    )
}

export default ImagesSection;