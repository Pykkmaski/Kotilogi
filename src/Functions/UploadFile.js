import axios from 'axios';

function UploadFile(file, title, descr, name, url, callback){
    if(!file) throw new Error('UploadFile: File missing!');
    if(!name) throw new Error('UploadFile: Name missing!');
    if(!url) throw new Error('UploadFile: Url missing!');

    const data = new FormData();
    console.log(file);
    data.append(name, file);
    data.append('title', title);
    data.append('description', descr);

    axios.post(url, data, {
        headers: {
            'Content-Type' : `multipart/form-data; boundary=${data._boundary}`,
        },
    })
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default UploadFile;