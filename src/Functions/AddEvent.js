import axios from 'axios';

function AddEvent(content, property_id, callback){
    axios.post(`/api/properties/${property_id}/events`, content || {
        name: 'Nimetön',
        description: 'Nimetön tapahtuma',
        date: new Date().toLocaleDateString('fi-FI'),
        property_id
    })
    .then(res => {
        console.log('Callbags');
        callback(res.data)
    })
    .catch(err => console.log(err.message));
}

export default AddEvent;