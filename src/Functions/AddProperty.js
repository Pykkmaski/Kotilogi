const { default: axios } = require("axios");

function AddProperty(content, callback){
    axios.post(`/properties`, content || {
        address : '',
        
    })
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default AddProperty;