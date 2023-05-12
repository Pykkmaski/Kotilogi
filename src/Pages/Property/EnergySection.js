import {useContext} from 'react';
import PropertyContext from '../../Contexts/PropertyContext';
import Section from '../../Components/Section';
import Button from '../../Components/Button';
import NoUsage from '../../Components/Error/NoUsage';

function EnergySection(props){
    const {property} = useContext(PropertyContext);
    const usage = [];

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
                {
                    usage.length ? 
                    null
                    :
                    <NoUsage/>
                }
            </Section.Body>
        </Section>
    )
}

export default EnergySection;