import axios from 'axios';

function AddEvent(content, property_id, callback){
    axios.post('/events', content || {
        name: 'Nimetön',
        description: 'Nimetön tapahtuma',
        date: new Date().toLocaleDateString('fi-FI'),
        property_id
    })
    .then(res => callback(res.data.id))
    .catch(err => console.log(err.message));
}

export default AddEvent;