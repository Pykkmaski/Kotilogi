import { useParams } from "react-router-dom";
import EventsSection from "./EventsSection";
import ImagesSection from "./ImagesSection";
import FilesSection from './FilesSection';
import InfoSection from "./InfoSection";
import useProperty from '../../Hooks/useProperty';
import Loading from '../Loading';
import PropertyContext from "../../Contexts/PropertyContext";
import UsageSection from "./UsageSection";

function Property(props){
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
                            <a onClick={toggleActive} className="cursor-pointer nav-link" href={`/#/properties/${property_id}/info`} title="Tarkastele talon tietoja" >Tiedot</a>
                            <a onClick={toggleActive} className="cursor-pointer nav-link" href={`/#/properties/${property_id}/events`} title="Tarkastele ja hallinnoi talon tapahtumia">Tapahtumat</a>
                            <a onClick={toggleActive} className="cursor-pointer nav-link" href={`/#/properties/${property_id}/energy`} >Kulutus</a>
                            <a onClick={toggleActive} className="cursor-pointer nav-link" href={`/#/properties/${property_id}/pictures`}>Kuvat</a>
                            <a onClick={toggleActive} className="cursor-pointer nav-link" href={`/#/properties/${property_id}/files`}>Tiedostot</a>
                        </nav>
                    </div>
                    
                    <div className="sidebar-group">
                        <div className="sidebar-title">Muut</div>
                        <nav>
                            <a className="cursor-pointer nav-link" href={`/#/`}>Takaisin Taloihin</a>
                        </nav>
                    </div>
                </div>

                <div id="property-page-content">
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
            </div>
        </PropertyContext.Provider>
        
    )
}

export default Property;