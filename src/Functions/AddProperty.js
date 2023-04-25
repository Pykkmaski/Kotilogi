import axios from 'axios';

function AddProperty(content, callback){
    console.log(axios.defaults.headers['Authorization']);

    axios.post(`/properties`, content || {
        address : '',
        
    })
    .then(res => callback(res.data.id))
    .catch(err => console.log(err.message));
}

export default AddProperty;