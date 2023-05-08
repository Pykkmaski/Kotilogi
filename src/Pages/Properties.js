const { default: Gallery } = require("../Components/Gallery");
const { default: useProperties } = require("../Hooks/useProperties");
import { useContext } from 'react';
import PropertyCard from '../Components/PropertyCard';
import AddProperty from '../Functions/AddProperty';
import LinkTo from '../Functions/LinkTo';
import Loading from './Loading';
import AppContext from '../Contexts/AppContext';
import Unauthorized from './Unauthorized';
import Section from '../Components/Section';

function Properties2(props){
    const [properties, loadProperties] = useProperties();
    const {token} = useContext(AppContext);

    if(!token) return <Unauthorized/>
    if(!properties) return <Loading message="Ladataan taloja..."/>


    return (
        <Section>
            <Section.Header>
                <h1>Talot</h1>
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Button title="Lisää Talo" onClickHandler={() => AddProperty(null, (property_id) => LinkTo(`/properties/${property_id}/info`))}/>
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