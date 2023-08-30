import axios from 'axios';

function DeleteProperty(property_id, callback){
    axios({
        method: 'DELETE',
        url: `/api/properties/${property_id}`,
    })
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default DeleteProperty;