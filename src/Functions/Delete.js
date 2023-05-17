import axios from "axios";

function Delete(url, callback){
    if(typeof(callback) !== 'function') throw new Error('Delete: callback must be a function!');
    axios.delete(url)
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default Delete;