import { useContext } from "react";
import AppContext from "../../Contexts/AppContext";

function EventEntry({item}){

    const {user} = useContext(AppContext);
    
    function deleteEntry(){
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
        location.assign(`/#/property/${item.property_id}/events/${item.id}/edit`);
    }

    return (
        <div className={`event-entry`}>
            <header>
                <h2>
                    {item.name}
                </h2>

                <div className="event-body-controls">
                    <button onClick={deleteEntry}>POISTA</button>
                    <button onClick={editEntry}>MUOKKAA</button>
                </div>
            </header>

            <div className={"event-body"} >
                <div className="event-body-data">
                    <span>{item.description}</span>
                    <span><strong>{item.date !== '' ? item.date : item.created_at}</strong></span>
                </div>
                
            </div>
        </div>
    );
}

export default EventEntry;