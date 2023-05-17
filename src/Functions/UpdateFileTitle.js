import axios from "axios";

function UpdateFileTitle(url, title, callback){
    axios.put(url, {
        title
    })
    .then(res => callback())
    .catch(err => err.message);
}

export default UpdateFileTitle;