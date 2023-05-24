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

function Properties(props){
    const [properties, loadProperties] = useProperties();
    const {token} = useContext(AppContext);
    const [editing, setEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const propertyToBeDeleted = useRef(null);

    if(!token) return <Unauthorized/>
    if(!properties) return <Loading message="Ladataan taloja..."/>

    function deleteHandler(property){
        propertyToBeDeleted.current = property;
        setShowDeleteModal(true);
    }

    return (
        <Section>
            <Section.Header>
                <h1>Talot</h1>
                <div className="group-row">
                <EditButton
                    editFunction={() => setEditing(true)}
                    cancelFunction={() => setEditing(false)}
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

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        {
                            properties.length ? 
                            properties.map(item => {
                                const url = `/#/properties/${item.id}/info`;
                                const propertyCard = <PropertyCard property={item} key={`property-card-${item.id}`} editing={editing} functions={{
                                    deleteProperty: (property) => deleteHandler(property)
                                }}/>
                                return(
                                    !editing ?
                                    <a href={url} className="container-link">
                                        {propertyCard}
                                    </a>
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