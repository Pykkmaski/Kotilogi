import axios from 'axios';

function UploadFile(file, name, url, callback){
    if(!file) throw new Error('UploadFile: File missing!');
    if(!name) throw new Error('UploadFile: Name missing!');
    if(!url) throw new Error('UploadFile: Url missing!');

    const data = new FormData();
    data.append(name, file);
    
    axios.post(url, data, {
        headers: {
            'Content-Type' : `multipart/form-data; boundary=${data._boundary}`,
        }
    })
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default UploadFile;