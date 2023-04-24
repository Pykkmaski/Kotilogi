import axios from 'axios';

function UpdateProperty(property_id, content, callback){
    axios.put(`/properties/${property_id}`, content)
    .then(res => callback())
    .catch(err => console.log(err.message));
}

module.exports = UpdateProperty;