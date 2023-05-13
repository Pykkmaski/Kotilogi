const { default: Gallery } = require("../Components/Gallery");
const { default: useProperties } = require("../Hooks/useProperties");
import { useContext } from 'react';
import PropertyCard from '../Components/Cards/PropertyCard';
import AddProperty from '../Functions/AddProperty';
import Loading from './Loading';
import AppContext from '../Contexts/AppContext';
import Unauthorized from './Unauthorized';
import Section from '../Components/Section';
import Button from '../Components/Button';

function Properties2(props){
    const [properties, loadProperties] = useProperties();
    const {token} = useContext(AppContext);

    if(!token) return <Unauthorized/>
    if(!properties) return <Loading message="Ladataan taloja..."/>


    return (
        <Section>
            <Section.Header>
                <h1>Talot</h1>
                <Button title="Lisää Talo" className="primary" variant="add" onClick={() => AddProperty(null, (property_id) => location.assign(`/#/properties/${property_id}/info`))}/>
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        {
                            properties.map(item => {
                                return(
                                    <PropertyCard property={item} key={`property-card-${item.id}`}/>
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