import axios from "axios";

function UploadEnergyUsage(property_id, data, callback){
    axios.post('/api/energy_usage', {
        data,
        property_id,
    })
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default UploadEnergyUsage;