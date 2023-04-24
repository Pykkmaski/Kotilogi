import axios from 'axios';

function DeleteProperty(property_id, callback){
    axios.delete(`/properties/${property_id}`)
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default DeleteProperty;