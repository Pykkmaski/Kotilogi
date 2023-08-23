import React, {useState, useRef, useEffect, useContext} from 'react';
import PropertyContext from '../../../Contexts/PropertyContext';
import Update from '../../../Functions/Update';
import EditableField from '../../../Components/EditableField';
import Loading from '../../Loading';
import Modal from '../../../Components/Modals/Modal';
import Section from '../../../Components/Section';
import Image from '../../../Components/Image';
import ConfirmModal from '../../../Components/Modals/ConfirmModal';
import Form from '../../../Components/Form';
import BuildingFieldset from './FormFieldsets/BuildingFieldset';
import RoofFieldset from './FormFieldsets/RoofFieldset';
import AreaFieldset from './FormFieldsets/AreaFieldset';
import YardFieldset from './FormFieldsets/YardFieldset';
import HeatingFieldset from './FormFieldsets/HeatingFieldset';

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

    function onSubmitHandler(e){
        e.preventDefault();

        const data = {
            address: e.target.address.value,
            type: e.target.type.value,
            build_permission: e.target.build_permission?.value,
            building_material: e.target.building_material.value,
            build_year: e.target.build_year.valueAsNumber,
            color: e.target.color.value,
            zip_code: e.target.zip_code.value,
            living_area: e.target.living_area.value,
            other_area: e.target.other_area.value,

            yard_area: e.target.yard_area?.value,
            yard_ownership: e.target.yard_ownership?.value,

            primary_heating_system: e.target.primary_heating_system.value,
            secondary_heating_system: e.target.secondary_heating_system.value,

            energy_class: e.target.energy_class.value,

            roof_type: e.target.roof_type.value,
            roof_material: e.target.roof_material.value,

            floor_count: e.target.floor_count.value,
            wc_count: e.target.wc_count.value,
            room_count: e.target.room_count.value,
        }

        Update(`/api/properties/${property.id}`, data, () => loadProperty());
        setEditing(false);
    }

    useEffect(() => {
        firstRender.current = false;
    }, []);

    useEffect(() => {
        if(property.address === null) setEditing(true);
    }, [property]);

    useEffect(() => {
        if(editing === false){
            setShowSubmitEditsModal(false);
        }
    }, [editing]);

    useEffect(() => {
        if(firstRender.current === true) return;
        unsavedChanges.current = true;
    }, [tempProperty.current]);

    if(!property) return <Loading message="Ladataan tietoja..."/>

    tempProperty.current = property;

    return (
        <Section data-test-id="info-section">
            <Section.Header>
                <div className="label-heading">
                    <span className="label">{property.address}</span>
                    <small>Tiedot</small>
                </div>
                

                <div className="group-row animated">
                    {
                        editing ? 
                        <>
                            <button className="secondary" onClick={cancelEdit}>Peruuta</button>
                            <button className="primary" type="submit" form="info-form">Tallenna Muutokset</button>
                        </>
                        :
                        <button className="primary" onClick={() => setEditing(true)}>Muokkaa</button>
                    }
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
                <Image src={`/api/images/properties/${property.id}/main`} className="main-image">
                    <Image.Controls>
                        <button className="primary" onClick={() => location.assign(`/#/properties/${property.id}/pictures`)}>Vaihda</button>
                    </Image.Controls>
                </Image>
                
                <Form className="horizontal-groups" onSubmit={onSubmitHandler} id="info-form">
                    <BuildingFieldset disabled={!editing}/>
                    <RoofFieldset disabled={!editing}/>
                    <AreaFieldset disabled={!editing}/>

                    {
                        property.type !== 'kerrostalo' ? <YardFieldset disabled={!editing}/> : <></>
                    }
                    
                    <HeatingFieldset disabled={!editing}/>
                </Form>
            </Section.Body>
        </Section>
    )
}

export default PropertyInfoSection;