import useProperty from '../Hooks/useProperty';

function PropertyInfoSection({property_id}){

    const [property, loadProperty] = useProperty(property_id);

    if(!property) return null;

    return (
        <div className="property-info-section">
            <div className="property-info-upper-part">
                <div className="property-info-upper-box" id="address-section">
                    <h1>{property.address}</h1>
                </div>

                <div className="property-info-upper-box" id="owners-section">
                    maljaajja
                </div>
            </div>

            <div className="property-info-lower-part">
                <div className="property-info-lower-box" id="details-section">
                    <div className="details-row">
                        <span className="details-title">Rakennusvuosi</span>
                        <span className="details-content">{property.build_year}</span>
                    </div>

                    <div className="details-row">
                        <span className="details-title">Rakennusmateriaali</span>
                        <span className="details-content">Puu-ukkeli</span>
                    </div>

                    <div className="details-row">
                        <span className="details-title">Väri</span>
                        <span className="details-content">{property.color}</span>
                    </div>

                    <div className="details-row">
                        <span className="details-title">Katto</span>
                        <span className="details-content">{property.roof_type || 'Tuntematon'}</span>
                    </div>

                    <div className="details-row">
                        <span className="details-title">Lämmitys</span>
                        <span className="details-content">{property.heating_type}</span>
                    </div>

                    <div className="details-row">
                        <span className="details-title">Asuintilojen pinta-ala</span>
                        <span className="details-content">{property.area}m<sup>2</sup></span>
                    </div>

                    <div className="details-row">
                        <span className="details-title">Tontin omistus</span>
                        <span className="details-content">{property.yard_ownership}</span>
                    </div>

                    <div className="details-row">
                        <span className="details-title">Tontin pinta-ala</span>
                        <span className="details-content">{property.yard_area}m<sup>2</sup></span>
                    </div>

                    <div className="details-row">
                        <span className="details-title">Huonoiden lukumäärä</span>
                        <span className="details-content">{property.room_count}</span>
                    </div>

                    <div className="details-row">
                        <span className="details-title">Vessojen lukumäärä</span>
                        <span className="details-content">{property.wc_count}</span>
                    </div>

                    <div className="details-row">
                        <span className="details-title">Kerrosten lukumäärä</span>
                        <span className="details-content">{property.floor_count}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyInfoSection;