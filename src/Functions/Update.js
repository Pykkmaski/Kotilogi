import axios from "axios";

function Update(url, data, callback){
    if(typeof(callback) !== 'function') throw new Error('Update: callback must be a function!');
    axios.put(url, {
        data
    })
    .then(res => callback())
    .catch(err => console.log('Update: ' + err.message));
}

export default Update;