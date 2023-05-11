import {useContext} from 'react';
import PropertyContext from '../../Contexts/PropertyContext';
import Section from '../../Components/Section';
import Button from '../../Components/Button';

function EnergySection(props){
    const {property} = useContext(PropertyContext);

    return (
        <Section>
            <Section.Header>
                <div className="label-heading">
                    <span className="label">{property.address}</span>
                    <h1>Kulutus</h1>
                </div>

                <div className="group-row">
                    <Button title="Lisää Kulutustieto" variant="add" className="primary"/>
                </div>
            </Section.Header>

            <Section.Body>

            </Section.Body>
        </Section>
    )
}

export default EnergySection;