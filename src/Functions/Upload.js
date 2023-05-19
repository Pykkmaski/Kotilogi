import axios from "axios";

function Upload(url, data, callback){
    if(typeof(callback) !== 'function') throw new Error('Delete: callback must be a function!');
    axios.post(url, {
        data
    })
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default Upload;