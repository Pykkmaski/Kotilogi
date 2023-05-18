const { default: Gallery } = require("../Components/Gallery");
const { default: useProperties } = require("../Hooks/useProperties");
import { useContext, useState } from 'react';
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

function Properties2(props){
    const [properties, loadProperties] = useProperties();
    const {token} = useContext(AppContext);
    const [editing, setEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [propertyToBeDeleted, setPropertyToBeDeleted] = useState(null);
    
    if(!token) return <Unauthorized/>
    if(!properties) return <Loading message="Ladataan taloja..."/>

    function deleteHandler(id){
        setPropertyToBeDeleted(id);
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

                <DeletePropertyModal
                    showModal={showDeleteModal}
                    setShowModal={setShowDeleteModal}
                    deleteProperty={() => DeleteProperty(propertyToBeDeleted, () => loadProperties())}
                />

            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        {
                            properties.map(item => {
                                const url = `/#/properties/${item.id}/info`;
                                const propertyCard = <PropertyCard property={item} key={`property-card-${item.id}`} editing={editing} functions={{
                                    deleteProperty: (id) => deleteHandler(id)
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
                        }
                    </Gallery.Body>
                
                </Gallery>
            </Section.Body>
        </Section>
    );
}

export default Properties2;