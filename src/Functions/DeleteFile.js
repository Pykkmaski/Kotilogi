import axios from 'axios';

function DeleteFile(url, callback){
    axios.delete(url)
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default DeleteFile;