const { default: Gallery } = require("../Components/Gallery");
const { default: useProperties } = require("../Hooks/useProperties");
import { useContext, useRef, useState } from 'react';
import PropertyCard from '../Components/Cards/PropertyCard';
import AddProperty from '../Functions/AddProperty';
import Loading from './Loading';
import AppContext from '../Contexts/AppContext';
import Unauthorized from './Unauthorized';
import Section from '../Components/Section';
import Button from '../Components/Buttons/Button';
import EditButton from '../Components/Buttons/EditButton';
import DeletePropertyModal from '../Components/Modals/DeletePropertyModal';
import DeleteProperty from '../Functions/DeleteProperty';
import ConfirmModal from '../Components/Modals/ConfirmModal';
import Delete from '../Functions/Delete';
import NoProperties from '../Components/Error/NoProperties';
import {Link} from 'react-router-dom';

function Properties(props){
    
    const {token, user} = useContext(AppContext);
    const [properties, loadProperties] = useProperties(user.email);
    const [displayProperties, setDisplayProperties] = useState([]);

    const [editing, setEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const propertyToBeDeleted = useRef(null);
    const searchTimeout = useRef(null);

    if(!token) return <Unauthorized/>
    if(!properties) return <Loading message="Ladataan taloja..."/>

    function deleteHandler(property){
        propertyToBeDeleted.current = property;
        setShowDeleteModal(true);
    }

    function searchOnChangeHandler(e){
        const value = e.target.value;
        if(value.length === 0) return;

        const timeoutDuration = 400;
        clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            console.log(e.target.value);
        }, timeoutDuration);
    }

    return (
        <Section>
            <Section.Header>
                <h1>Talot</h1>
                <div className="group-row">
                <EditButton
                    editFunction={() => setEditing(true)}
                    cancelFunction={() => setEditing(false)}
                    hidden={!properties.length}
                >Muokkaa</EditButton>
                <Button className="primary" variant="add" onClick={() => AddProperty(null, (property_id) => location.assign(`/#/properties/${property_id}/info`))}>Lisää Talo</Button>
                </div>

                <ConfirmModal
                    showModal={showDeleteModal}
                    setShowModal={setShowDeleteModal}

                    title="Poista Talo"
                    text={`Haluatko varmasti poistaa talon ${propertyToBeDeleted.current?.address}? Tätä ei voi kumota!`}

                    onConfirm={() => {
                        Delete(`/api/properties/${propertyToBeDeleted.current.id}`, () => loadProperties());
                        setShowDeleteModal(false);
                    }}

                    onCancel={() => {
                        setShowDeleteModal(false);
                        propertyToBeDeleted.current = null;
                    }}
                />

            </Section.Header>

            <Section.Body id="properties-page-body">

                <div id="properties-page-description-box">
                    <h1>Kiinteistöt</h1>
                    <p>
                        Täällä näet lisäämäsi kiinteistöt. Paina Lisää Uusi Kiinteistö-nappia 
                        määrittääksesi uuden kiinteistön.
                    </p>
                </div>
                
                <Gallery>
                    <Gallery.Body className={properties.length === 0 ? 'empty' : null}>
                        {
                            properties.length ? 
                            properties.map(item => {
                                const url = `/properties/${item.id}/info`;
                                const propertyCard = <PropertyCard property={item} key={`property-card-${item.id}`} editing={editing} functions={{
                                    deleteProperty: (property) => deleteHandler(property)
                                }}/>
                                return(
                                    !editing ?
                                    <Link to={url} className="container-link">
                                        {propertyCard}
                                    </Link>
                                    :
                                    propertyCard
                                )
                            })
                            :
                            <NoProperties/>
                        }

                    </Gallery.Body>
                
                </Gallery>
            </Section.Body>
        </Section>
    );
}

export default Properties;