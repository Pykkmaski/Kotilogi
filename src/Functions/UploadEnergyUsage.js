import axios from "axios";

function UploadEnergyUsage(data, callback){
    axios.post('/api/energy_usage', {
        data,
    })
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default UploadEnergyUsage;