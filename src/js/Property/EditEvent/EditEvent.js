import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../Contexts/AppContext";
import Loading from "../../Loading/Loading";
import './Style.scss';

function AddEvent(props){

    const [propertyEvent, setEvent] = useState(null);
    const {user} = useContext(AppContext);
    const {event_id, property_id} = useParams();

    useEffect(() => {
        const req = new XMLHttpRequest();
        req.open('GET', `/property/events/${event_id}`);
        req.setRequestHeader('Auth', user.token);
        req.send();

        req.onload = () => {
            if(req.status === 200){
                setEvent(req.response);
            }
            else{
                console.log(req.status);
            }
        }

    }, []);

    function submit(e){
        e.preventDefault();
        const req = new XMLHttpRequest();
        req.open('PUT', `/property/events/${event_id}`);
        req.setRequestHeader('Auth', user.token);
        req.setRequestHeader('Content-Type', 'application/json');

        const data = {
            name : e.target.name.value,
            description: e.target.description.value,
            date: e.target.date.value,
            property_id: propertyEvent.property_id,
            id: propertyEvent.id,
        }

        req.send(JSON.stringify(data));

        req.onload = () => {
            if(req.status === 200){
                location.assign(`/#/property/${propertyEvent.property_id}/repairs`);
            }
            else{
                console.log(req.status);
            }
        }
    }

    

    if(!propertyEvent) return <Loading message={'Ladataan tapahtumaa...'}/>

    function cancel(){
        location.assign(`/#/property/${property_id}/repairs`);
    }

    console.log(propertyEvent.name);
    return (
        <div className="page" id="edit-event-page">
            <form onSubmit={submit}>
                <h1>Muokkaa tapahtuma</h1>
                <input name="name" type="text" placeholder={"Otsikko"} required value={propertyEvent.name}/>
                <input name="date" type="date" required value={propertyEvent.date}/>
                <textarea name="description" placeholder="Kuvaus..." value={propertyEvent.description}></textarea>
                <div className="button-group">
                    <button onClick={cancel}>Peruuta</button>
                    <button className="submit-button" type="submit">Lisää</button>
                </div>
                
            </form>
        </div>
    )
}

export default AddEvent;