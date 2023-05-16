import {useContext} from 'react';
import PropertyContext from '../../Contexts/PropertyContext';
import Section from '../../Components/Section';
import Button from '../../Components/Buttons/Button';
import NoUsage from '../../Components/Error/NoUsage';
import ApexCharts from 'apexcharts';

function EnergySection(props){
    const {property} = useContext(PropertyContext);
    const usage = [];
    const series = [1, 2, 1, 2, 1 ,2];

    return (
        <Section>
            <Section.Header>
                <div className="label-heading">
                    <span className="label">{property.address}</span>
                    <h1>Kulutus</h1>
                </div>

                <div className="group-row">
                    <Button variant="add" className="primary">Lisää Kulutustieto</Button>
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