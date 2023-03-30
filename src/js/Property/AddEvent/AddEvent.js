import { useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../Contexts/AppContext";

function AddEvent(props){

    const {user} = useContext(AppContext);
    const {id} = useParams();

    function submit(e){
        e.preventDefault();
        const req = new XMLHttpRequest();
        req.open('POST', `/property/${id}/events/add`, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('Auth', user.token);

        const data = {
            name : e.target.name.value,
            description : e.target.description.value,
            property_id: id,
        }

        req.send(JSON.stringify(data));

        req.onload = () =>{
            if(req.status === 200){
               location.assign(`/#/property/${id}/repairs`);
            }
            else{
                console.log(req.response);
            }
        }
    }

    return (
        <div className="page" id="add-event-page">
            <form onSubmit={submit}>
                <h1>Lisää uusi tapahtuma</h1>
                <input name="name" type="text" placeholder="Otsikko"/>
                <textarea name="description" placeholder="Kuvaus..."></textarea>
                <button type={submit}>Lisää</button>
            </form>
        </div>
    )
}

export default AddEvent;