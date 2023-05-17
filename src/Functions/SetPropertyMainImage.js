import axios from "axios";

function setPropertyMainImage(property_id, image_id){
    axios.put(`/api/images/properties/${property_id}/main/${image_id}`)
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default setPropertyMainImage;