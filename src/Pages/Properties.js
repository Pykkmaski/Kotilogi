const { default: Gallery } = require("../Components/Gallery");
const { default: useProperties } = require("../Hooks/useProperties");
import { useContext } from 'react';
import PropertyCard from '../Components/PropertyCard';
import AddProperty from '../Functions/AddProperty';
import LinkTo from '../Functions/LinkTo';
import Loading from './Loading';
import AppContext from '../Contexts/AppContext';
import Unauthorized from './Unauthorized';

function Properties2(props){
    const [properties, loadProperties] = useProperties();
    const {token} = useContext(AppContext);

    if(!token) return <Unauthorized/>
    if(!properties) return <Loading message="Ladataan taloja..."/>


    return (
        <div className="d-flex flex-column px-10 align-items-center">
            <Gallery buttonTitle="Lisää Talo" title="Talot" onClickHandler={() => {
                AddProperty(null, (property_id) => LinkTo(`/properties/${property_id}/info`))
            }
            }>
                {
                    properties.map(item => {
                        return(
                            <PropertyCard property={item} key={`property-card-${item.id}`}/>
                        )
                    })
                }
            </Gallery>
        </div>
    );
}

export default Properties2;