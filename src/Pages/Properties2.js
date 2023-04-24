const { default: Gallery } = require("../Components/Gallery");
const { default: useProperties } = require("../Hooks/useProperties");
import PropertyCard from '../Components/PropertyCard';
import AddProperty from '../Functions/AddProperty';
import LinkTo from '../Functions/LinkTo';
import Loading from './Loading';

function Properties2(props){
    const [properties, loadProperties] = useProperties();

    if(!properties) return <Loading message="Ladataan taloja..."/>

    return (
        <div className="d-flex flex-column px-10 align-items-center">
            <Gallery secondaryTitle="Lisää Talo" title="Talot" onClickHandler={() => AddProperty(null, (property_id) => LinkTo(`/property/${property_id}`))}>
                {
                    properties.map(item => {
                        return(
                            <PropertyCard property={item}/>
                        )
                    })
                }
            </Gallery>
        </div>
    );
}

export default Properties2;