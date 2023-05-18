import React, {useState, useRef, useEffect, useContext} from 'react';
import PropertyContext from '../../Contexts/PropertyContext';
import Update from '../../Functions/Update';
import EditableField from '../../Components/EditableField';
import Loading from '../Loading';
import Modal from '../../Components/Modals/Modal';
import Section from '../../Components/Section';
import Image from '../../Components/Image';
import ConfirmModal from '../../Components/Modals/ConfirmModal';

function PropertyInfoSection(props){

    const {property, loadProperty} = useContext(PropertyContext);
    const [editing, setEditing] = useState(false);
    const [showSubmitEditsModal, setShowSubmitEditsModal] = useState(false);
    const tempProperty = useRef({});
    const unsavedChanges = useRef(false);
    const firstRender = useRef(true);
    const propertyMainImage = `/api/images/properties/${property.id}/main`;

    function cancelEdit(){
        tempProperty.current = property;
        unsavedChanges.current = false;
        setEditing(false);
        loadProperty();
    }

    function saveChanges(){
        setEditing(false);
        Update(`/api/properties/${property.id}`, tempProperty.current, () => loadProperty());
    }

    useEffect(() => {
        firstRender.current = false;
        console.log('First render');
    }, []);

    useEffect(() => {
        if(editing === false){
            setShowSubmitEditsModal(false);
        }
    }, [editing]);

    useEffect(() => {
        if(firstRender.current === true) return;
        unsavedChanges.current = true;
        console.log('Unsaved changes');
    }, [tempProperty.current]);

    if(!property) return <Loading message="Ladataan tietoja..."/>

    tempProperty.current = property;

    return (
        <Section>
            <Section.Header>
                <div className="label-heading">
                    <span className="label">{property.address}</span>
                    <h1>Tiedot</h1>
                </div>
                

                <div className="group-row animated">
                    {
                        editing ? <button className="secondary" onClick={() => setShowSubmitEditsModal(true)}>Peruuta</button> : null
                    }

                    <button className="primary" onClick={() => {
                        if(!editing){
                            setEditing(true);
                        }
                        else{
                            saveChanges();
                        }
                    }}>
                        {
                            editing ? 'Tallenna Muutokset' : 'Muokkaa Tietoja'
                        }
                    </button>
                </div>

                <ConfirmModal
                    showModal={showSubmitEditsModal}
                    setShowModal={setShowSubmitEditsModal}
                    title="Tallentamattomia muutoksia" 
                    text="Sinulla on tallentamattomia muutoksia. Halutako hylätä ne?"

                    onCancel={() => setShowSubmitEditsModal(false)}
                    onConfirm={() => cancelEdit()}
                />

            </Section.Header>

            <Section.Body>
                <Image src={`/api/images/properties/${property.id}/main`} className="main-image"/>
                <div className="info-group">
                    <header>
                        <h2>Yleistiedot</h2>
                    </header>
                    
                    <EditableField 
                        label={"Osoite"} 
                        defaultValue={property?.address} 
                        editing={editing}
                        onChange={(e) => {
                            tempProperty.current.address = e.target.value;
                        }}
                    />

                    <EditableField
                        label="Postinumero"
                        defaultValue={property?.zip_code}
                        editing={editing}
                        onChange={(e) => {
                            tempProperty.current.zip_code = e.target.value;
                        }}
                    />

                    <EditableField 
                        label={"Talotyyppi"} 
                        defaultValue={property?.property_type} 
                        editing={editing}
                        onChange={(e) => {
                            tempProperty.current.property_type = e.target.value;
                        }}
                    />

                    <EditableField 
                        label={"Väri"} 
                        defaultValue={property?.color} 
                        editing={editing}
                        onChange={(e) => {
                            tempProperty.current.color = e.target.value;
                        }}
                    />

                    <EditableField 
                        label={"Lämmitys"} 
                        defaultValue={property?.heating_type} 
                        editing={editing}
                        onChange={(e) => {
                            tempProperty.current.heating_type = e.target.value;
                        }}
                    />
                </div>

                <div className="info-group">
                    <header>
                        <h2>Katto</h2>
                    </header>
                    
                    <EditableField 
                        label={"Tyyppi"} 
                        defaultValue={property?.roof_type} 
                        editing={editing}
                        onChange={(e) => {
                            tempProperty.current.roof_type = e.target.value;
                        }}
                    />

                    <EditableField 
                        label={"Materiaali"} 
                        defaultValue={property?.roof_material} 
                        editing={editing}
                        onChange={(e) => {
                            tempProperty.current.roof_material = e.target.value;
                        }}
                    />
                </div>

                <div className="info-group">
                    <header>
                        <h2>Asuintilat</h2>
                    </header>
                    

                    <EditableField 
                        label={"Pinta-ala"} 
                        defaultValue={property?.area} 
                        editing={editing}
                        onChange={(e) => {
                            tempProperty.current.area = e.target.value;
                        }}
                    />
                </div>

                <div className="info-group">
                    <header>
                        <h2>Tontti</h2>
                    </header>
                    
                    <EditableField 
                        label={"Omistus"} 
                        defaultValue={property?.yard_ownership} 
                        editing={editing}
                        onChange={(e) => {
                            tempProperty.current.yard_ownership = e.target.value;
                        }}
                    />

                    <EditableField 
                        label={"Tontin pinta-ala"} 
                        defaultValue={property?.yard_area} 
                        editing={editing}
                        onChange={(e) => {
                            tempProperty.current.yard_area = e.target.value;
                        }}
                    />
                </div>

                

                <div className="info-group">
                    <header>
                        <h2>Muut</h2>
                    </header>
                
                    <EditableField 
                        label={"Huoneiden lukumäärä"} 
                        defaultValue={property?.room_count} 
                        editing={editing}
                        onChange={(e) => {
                            tempProperty.current.room_count = e.target.value;
                        }}
                    />

                    <EditableField 
                        label={"Vessojen lukumäärä"} 
                        defaultValue={property?.wc_count} 
                        editing={editing}
                        onChange={(e) => {
                            tempProperty.current.wc_count = e.target.value;
                        }}
                    />

                    <EditableField 
                        label={"Kerrosten lukumäärä"} 
                        defaultValue={property?.floor_count} 
                        editing={editing}
                        onChange={(e) => {
                            tempProperty.current.floor_count = e.target.value;
                        }}
                    />
                </div>
            </Section.Body>
            
        </Section>
    )
}

export default PropertyInfoSection;