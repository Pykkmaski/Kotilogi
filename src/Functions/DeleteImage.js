import axios from "axios";

function DeleteImage(image_id, callback){
    axios.delete(`/api/images/properties/${image_id}`)
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default DeleteImage;