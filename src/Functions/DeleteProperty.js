import axios from 'axios';

function DeleteProperty(property_id, password, callback){
    axios.delete(`/api/properties/${property_id}`, {
        password
    })
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default DeleteProperty;