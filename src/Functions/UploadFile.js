import axios from 'axios';

function UploadFile(file, name, dest, callback){

    const data = new FormData();
    data.append(name, file);

    const urlPropertyPortion = dest.property_id ? `property/${dest.property_id}/` : '';
    const urlEventPortion = dest.event_id ? `events/${dest.event_id}` : '';

    const url = '/images/' + urlPropertyPortion + urlEventPortion;
    console.log(url);
    
    axios.post(url, data, {
        headers: {
            'Content-Type' : `multipart/form-data; boundary=${data._boundary}`,
        }
    })
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default UploadFile;