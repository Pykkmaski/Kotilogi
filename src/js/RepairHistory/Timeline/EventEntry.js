import { useContext } from "react";
import AppContext from "../../Contexts/AppContext";

function EventEntry({item, altColor}){

    const {user} = useContext(AppContext);
    
    function deleteEntry(){
        const c = confirm(`Oletko varma että haluat poistaa tapahtuman?`);
        if(!c) return;
        
        const req = new XMLHttpRequest();
        req.open('DELETE', `/property/${item.property_id}/events/${item.id}`, true);
        req.setRequestHeader('Auth', user.token);
        req.send();

        req.onload = () => {
            if(req.status === 200){
                location.reload();
            }
            else{
                console.log(req.status);
            }
        }
    }

    function editEntry(){
        location.assign(`/#/property/${item.property_id}/events/${item.id}/`);
    }

    return (
        <div className={`flex-column border gap-m rounded event-entry hover-primary-light padding-m${altColor ? " bg-primary" : ""}`}>
            <header>
                <h2>
                    {item.name}
                </h2>

                <div className="event-body-controls fill gap-l flex-row right-justify">
                    <button onClick={deleteEntry}>POISTA</button>
                    <button onClick={editEntry}>MUOKKAA</button>
                </div>
            </header>

            <div className="flex-row font-sze-m" >
                <div className="flex-column">
                    <span>{item.description}</span>
                    <span><strong>{item.date !== '' ? item.date : item.created_at}</strong></span>
                </div>
                
            </div>
        </div>
    );
}

export default EventEntry;