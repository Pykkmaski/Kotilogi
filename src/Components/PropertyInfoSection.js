import useProperty from '../Hooks/useProperty';

function PropertyInfoSection({property_id}){

    const [property, loadProperty] = useProperty(property_id);

    if(!property) return null;

    return (
        <div className="property-info-section">
            <header>
                <h1>Tiedot</h1>
            </header>

            <div className="info-group">
                <header>
                    <h2>Yleistiedot</h2>
                </header>
                Väri
                Kattotyyppi
                Talotyyppi
                Lämmitys
            </div>

            <div className="info-group">
                <header>
                    <h2>Mitat</h2>
                </header>

            </div>

            <div className="info-group">
                <header>
                    <h2>Lukumäärät</h2>
                </header>

            </div>
        </div>
    )
}

export default PropertyInfoSection;