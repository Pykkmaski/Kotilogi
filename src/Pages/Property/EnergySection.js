import {useContext, useState} from 'react';
import PropertyContext from '../../Contexts/PropertyContext';
import Section from '../../Components/Section';
import Button from '../../Components/Buttons/Button';
import NoUsage from '../../Components/Error/NoUsage';
import ApexCharts from 'apexcharts';
import UploadEnergyUsageModal from '../../Components/Modals/UploadEnergyUsageModal';
import UploadEnergyUsage from '../../Functions/UploadEnergyUsage';
import useEnergyUsage from '../../Hooks/useEnergyUsage';
import EnergyUsageCard from '../../Components/Cards/EnergyUsageCard';
import Gallery from '../../Components/Gallery';

function EnergySection(props){
    const {property} = useContext(PropertyContext);
    const [showModal, setShowModal] = useState(false);
    const [energyUsage, loadEnergyUsage] = useEnergyUsage(property.id);

    return (
        <Section>
            <Section.Header>
                <div className="label-heading">
                    <span className="label">{property.address}</span>
                    <h1>Kulutus</h1>
                </div>

                <div className="group-row">
                    <Button variant="add" className="primary" onClick={() => setShowModal(true)}>Lisää Kulutustieto</Button>
                </div>

                <UploadEnergyUsageModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    submitFunction={(e) => {
                        e.preventDefault();
                        const data = {
                            time: e.target.date.value,
                            watt_amount: e.target.watt_amount.valueAsNumber,
                            price: e.target.price.valueAsNumber,
                            property_id: property.id,
                        }

                        UploadEnergyUsage(data, () => {
                            loadEnergyUsage();
                            setShowModal(false);
                        });
                        //setShowModal(false);
                    }}
                />
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        {
                            energyUsage?.map(data => {
                                const element = <EnergyUsageCard usage={data} editing={false} functions={null}/>
                                return element;
                            })
                        }
                    </Gallery.Body>
                </Gallery>
               
            </Section.Body>
        </Section>
    )
}

export default EnergySection;