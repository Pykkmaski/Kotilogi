import { useParams, Link, useNavigate } from "react-router-dom";
import EventsSection from "./EventsSection";
import ImagesSection from "./ImagesSection";
import FilesSection from './FilesSection';
import InfoSection from "./InfoSection/InfoSection";
import useProperty from '../../Hooks/useProperty';
import Loading from '../Loading';
import PropertyContext from "../../Contexts/PropertyContext";
import UsageSection from "./UsageSection";
import AppContext from "../../../contexts/AppContext";
import { useContext, useEffect } from "react";

function Property(props){
    const navigate = useNavigate();
    const {property_id, section} = useParams();
    const [property, loadProperty] = useProperty(property_id);

    if(!property) return <Loading message="Ladataan Taloa..."/>

    function toggleActive(e){
        const targetClassList = e.target.classList;
        const navbarLinks = document.querySelector('.nav-link');
        
        const className = 'active';
        navbarLinks.foreach(item => item.classList.remove(className));
        
        const hasClass = targetClassList.contains(className);

        if(hasClass){
            targetClassList.remove(className);
        }
        else{
            targetClassList.add(className);
        }
    }

    return (
        <PropertyContext.Provider value={{property, loadProperty}}>
            <div id="property-page" data-testid="property-page">
                <div className="sidebar">
                    <div className="sidebar-group">
                        <div className="sidebar-title">Talon toiminnot</div>
                        <nav>
                            <Link className="cursor-pointer nav-link" to={`/properties/${property_id}/info`} title="Tarkastele talon tietoja" >Tiedot</Link>
                            <Link className="cursor-pointer nav-link" to={`/properties/${property_id}/events`} title="Tarkastele ja hallinnoi talon tapahtumia">Tapahtumat</Link>
                            <Link className="cursor-pointer nav-link" to={`/properties/${property_id}/energy`} >Kulutus</Link>
                            <Link className="cursor-pointer nav-link" to={`/properties/${property_id}/pictures`}>Kuvat</Link>
                            <Link className="cursor-pointer nav-link" to={`/properties/${property_id}/files`}>Tiedostot</Link>
                        </nav>
                    </div>
                    
                    <div className="sidebar-group">
                        <div className="sidebar-title">Muut</div>
                        <nav>
                            <a className="cursor-pointer nav-link" href={`/#/`}>Takaisin Taloihin</a>
                        </nav>
                    </div>
                </div>

                {
                    section === 'info' ? <InfoSection/>
                    :
                    section === 'events' ? <EventsSection/>
                    :
                    section === 'pictures' ? <ImagesSection/>
                    :
                    section === 'files' ? <FilesSection/>
                    :
                    section === 'energy' ? <UsageSection/>
                    : 
                    null
                }
            </div>
        </PropertyContext.Provider>
        
    )
}

export default Property;