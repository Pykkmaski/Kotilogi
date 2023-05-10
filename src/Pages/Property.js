import { useParams } from "react-router-dom";
import PropertyEventsSection from "../Components/PropertyEventsSection";
import PropertyPicturesSection from "../Components/PropertyPicturesSection";
import PropertyFilesSection from '../Components/PropertyFilesSection';
import PropertyInfoSection from "../Components/PropertyInfoSection";
import useProperty from '../Hooks/useProperty';
import Section from "../Components/Section";
import Button from "../Components/Button";
import Loading from './Loading';
import PropertyContext from "../Contexts/PropertyContext";
import AppModal from "../Modals/AppModal";

function EnergySection(props){
    return (
        <Section>
            <Section.Header>
                <h1>Kulutus</h1>
                <div className="group-row">
                    <Button title="Lisää Kulutustieto" variant="add" className="primary"/>
                </div>
            </Section.Header>

            <Section.Body>

            </Section.Body>
            
            <AppModal
                variant="upload/energy"
                showModal={null}
                setShowModal={null}
                uploadFunction={(e) => {
                    e.preventDefault();
                }}
            />
        </Section>
    )
}

function Property(props){
    const {property_id, section} = useParams();
    const [property, loadProperty] = useProperty(property_id);

    if(!property) return <Loading message="Ladataan Taloa..."/>

    return (
        <PropertyContext.Provider value={{property}}>
            <div id="property-page">
                <div className="sidebar">
                    <div className="sidebar-group">
                        <div className="sidebar-title">Talon toiminnot</div>
                        <nav>
                            <a className="cursor-pointer nav-link" href={`/#/properties/${property_id}/info`} title="Tarkastele talon tietoja">Tiedot</a>
                            <a className="cursor-pointer nav-link" href={`/#/properties/${property_id}/events`} title="Tarkastele ja hallinnoi talon tapahtumia">Tapahtumat</a>
                            <a className="cursor-pointer nav-link" href={`/#/properties/${property_id}/energy`} >Kulutus</a>
                            <a className="cursor-pointer nav-link" href={`/#/properties/${property_id}/pictures`}>Kuvat</a>
                            <a className="cursor-pointer nav-link" href={`/#/properties/${property_id}/files`}>Tiedostot</a>
                        </nav>
                    </div>
                    
                    <div className="sidebar-group">
                        <div className="sidebar-title">Muut</div>
                        <nav>
                            <a className="cursor-pointer nav-link" href={`/#/user`}>Takaisin Taloihin</a>
                            <a className="cursor-pointer nav-link">Poista Talo</a>
                        </nav>
                    </div>
                </div>

                <div id="property-page-content">
                    {
                        section === 'info' ? <PropertyInfoSection property_id={property_id}/>
                        :
                        section === 'events' ? <PropertyEventsSection property_id={property_id}/>
                        :
                        section === 'pictures' ? <PropertyPicturesSection property_id={property_id}/>
                        :
                        section === 'files' ? <PropertyFilesSection property_id={property_id}/>
                        :
                        section === 'energy' ? <EnergySection/>
                        : 
                        null
                    }
                </div>
            </div>
        </PropertyContext.Provider>
        
    )
}

export default Property;