import { useContext, useState } from "react";
import AppContext from "../../Contexts/AppContext";
import AccessDenied from "../../AccessDenied/AccessDenied";
import AddEvent from '../AddEvent/AddEvent';
import '../../../scss/AddProperty.scss';

function Add(props){
    const {user} = useContext(AppContext);
    const [error, setError] = useState(null);
    
    function submit(e){
        e.preventDefault();

        const req = new XMLHttpRequest();
        req.open('POST', '/property', true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('Auth', user.token);

        const data = {
            owner:              user.username,
            address:            e.target.address.value,
            build_year:         e.target.buildYear.value,
            heating_type:       e.target.heatingType.value,
            wc_count:           e.target.wc_count.value,
            floor_count:        e.target.floor_count.value,
            area:               e.target.area.value,
            yard_ownership:     e.target.yard_ownership.value,
            yard_area:          e.target.yard_area.value,
            color:              e.target.color.value,
            roof_type:          e.target.roof_type.value,
            room_count:         e.target.room_count.value,

        }
        
        req.send(JSON.stringify(data));
        req.onload = () => {
            if(req.status === 200){
                location.assign('/#/user');
            }
            else{
                setError(req.status);
            }
        }
    }

    if(!user) return <AccessDenied/>

    return(
        <div className="page" id="add-property-page">
            <form onSubmit={submit}>
                <h1>Lisää Uusi Talo</h1>
                <div id="inputs">
                <input name="address" placeholder="Katuosoite"></input>
                <select name="propertyType">
                    <option value="" disabled selected>Talotyyppi</option>
                    <option value="Rintamamiestalo">Rintamamiestalo</option>
                    <option value="Tasakatto">Tasakatto</option>
                    <option value="Harjakatto">Harjakatto</option>
                </select>

                <select name="heatingType" placeholder="Lämmitystyyppi" required>
                    <option value="" disabled selected={true}>Lämmitystyyppi</option>
                    <option value="Sähkö">Sähkö</option>
                    <option value="Kaukolämpö">Kaukolämpö</option>
                    <option value="Maalämpö">Maalämpö</option>
                    <option value="Öljy">Öljy</option>
                    <option value="Vesi-Ilmalämpöpumppu">Vesi-Ilmalämpöpumppu</option>
                    <option value="Ilmalämpöpumppu">Ilmalämpöpumppu</option>
                </select>

                <select name="yard_ownership" placeholder="Tontin omistajuus" required>
                    <option value="" disabled selected={true}>Tontin omistajuus</option>
                    <option value="Oma">Oma</option>
                    <option value="Vuokra">Vuokra</option>
                </select>

                <select name="roof_type" placeholder="Kattotyyppi">
                    <option value="" disabled selected={true}>Kattotyyppi</option>
                </select>

                <input name="color" placeholder="Asunnon väri" required/>
                <input name="area" type="number" placeholder="Asunnon neliömäärä" required step={0.01} min={0}/>
                <input name="yard_area" type="number" placeholder="Tontin neliömäärä" required step={0.01} min={0}/>
                <input name="wc_count" type="number" placeholder="Vessojen lukumäärä" required step={1} min={0}/>
                <input name="floor_count" type="number" placeholder="Kerroksien lukumäärä" required step={1} min={1}/>
                <input name="room_count" type="number" placeholder="Huoneiden lukumäärä" required ste={1} min={1}/>
                <input name="buildYear" placeholder="Rakennusvuosi" type="number" maxLength={4}></input>
                </div>
                
                <button type="submit">Lisää</button>

                {
                    error ? <span className="error">{error}</span>
                    :
                    null
                }
            </form>
        </div>
    )
}

export default Add;