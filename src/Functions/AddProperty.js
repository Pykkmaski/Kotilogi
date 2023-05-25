import axios from 'axios';

function AddProperty(content, callback){
    console.log(axios.defaults.headers['Authorization']);

    axios.post(`/api/properties`, content || {
        address : '',
    })
    .then(res => callback(res.data))
    .catch(err => console.log(err.message));
}

export default AddProperty;