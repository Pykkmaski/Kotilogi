import { useContext } from "react";
import AppContext from "../Contexts/AppContext";
import AccessDenied from "../AccessDenied/AccessDenied";

function AddProperty(props){
    const {user} = useContext(AppContext);

    function submit(e){
        e.preventDefault();

        const req = new XMLHttpRequest();
        req.open('POST', '/property', true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('Auth', user.token);

        const data = {
            owner: user.username,
            address: e.target.address.value,
            build_year: e.target.buildYear.value,
            heating_type: e.target.heatingType.value,
        }

        req.send(JSON.stringify(data));
        req.onload = () => {
            if(req.status === 200){
                console.log('Property added successfully!');
            }
            else{
                console.log('Property addition failed!');
            }
        }
    }

    if(!user) return <AccessDenied/>

    return(
        <div className="page" id="add-property-page">
            <form onSubmit={submit}>
                <h1>Lisää Uusi Talo</h1>
                <input name="address" placeholder="Katuosoite"></input>
                <select name="heatingType" placeholder="Lämmitystyyppi">
                    <option value="" disabled selected={true}>Lämmitystyyppi</option>
                    <option value="electric">Sähkö</option>
                    <option value="central">Kaukolämpö</option>
                    <option value="ground">Maalämpö</option>
                    <option value="oil">Öljy</option>
                    <option value="water_air_pump">Vesi-Ilmalämpöpumppu</option>
                    <option value="air_heat_pump">Ilmalämpöpumppu</option>
                </select>
                <input name="buildYear" placeholder="Rakennusvuosi" type="number" maxLength={4}></input>
                <button type="submit">Lisää</button>
            </form>
        </div>
    )
}

export default AddProperty;