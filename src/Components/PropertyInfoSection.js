import {useState, useRef, useEffect} from 'react';
import useProperty from '../Hooks/useProperty';
import UpdateProperty from '../Functions/UpdateProperty';
import EditableField from './EditableField';
import Loading from '../Pages/Loading';
import Modal from './Modal';

function PropertyInfoSection({property_id}){

    const [property, loadProperty] = useProperty(property_id);
    const [editing, setEditing] = useState(false);
    const [showSubmitEditsModal, setShowSubmitEditsModal] = useState(false);

    const tempProperty = useRef({});

    function cancelEdit(){
        tempProperty.current = property;
        setEditing(false);
        loadProperty();
    }

    function saveChanges(){
        setEditing(false);
        UpdateProperty(property_id, tempProperty.current, () => loadProperty());
    }

    useEffect(() => {
        if(editing === false){
            setShowSubmitEditsModal(false);
        }
    }, [editing]);

    if(!property) return <Loading message="Ladataan tietoja..."/>

    tempProperty.current = property;

    return (
        <div className="property-info-section">
            <header>
                <h1>Tiedot</h1>

                <div className="button-group">
                    {
                        editing ? <button className="secondary" onClick={() => setShowSubmitEditsModal(true)}>Peruuta</button> : null
                    }

                    <button className="primary" onClick={() => {
                        if(!editing){
                            setEditing(true);
                        }
                        else{
                            saveChanges()
                        }
                    }}>
                        {
                            editing ? 'Tallenna Muutokset' : 'Muokkaa Tietoja'
                        }
                    </button>
                </div>

                <Modal show={showSubmitEditsModal} onHide={() => setShowSubmitEditsModal(false)}>
                    <Modal.Header>
                        <Modal.Title>Tallentamattomia Muutoksia</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Haluatko varmasti peruuttaa tekemäsi muutokset?
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="secondary" onClick={() => setShowSubmitEditsModal(false)}>Ei</button>
                        <button className="primary" onClick={() => cancelEdit()}>Kyllä</button>
                    </Modal.Footer>
                </Modal>
            </header>

            <div className="body">
                <div className="info-group">
                    <h2>Yleistiedot</h2>
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
                        defaultValue={null}
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
                    <h2>Katto</h2>
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
                    <h2>Asuintilat</h2>

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
                    <h2>Tontti</h2>
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
                    <h2>Muut</h2>

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
            </div>
            
        </div>
    )
}

export default PropertyInfoSection;