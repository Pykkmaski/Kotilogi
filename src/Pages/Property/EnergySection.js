import {useContext, useState, useEffect} from 'react';
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
import Loading from '../Loading';

function renderCharts(energyUsage){
    if(energyUsage !== null){
        const priceOptions = {
            series: [{
                name: 'Hinta',
                data: energyUsage.map(d => d.price),
            }],

            chart: {
                height: 350,
                width: 750,
                type: 'line',
                zoom: {
                  enabled: false
                }
            },

            stroke: {
                curve: 'straight'
            },

            title: {
                text: 'Energian hinta (€)',
                align: 'left'
            },
        }

        const wattOptions = {
            series: [{
                name: 'Energiankulutus',
                data: energyUsage.map(d => d.watt_amount),
            }],

            chart: {
                height: 350,
                width: 750,
                type: 'line',
                zoom: {
                  enabled: false
                }
            },

            stroke: {
                curve: 'straight',
                colors: ['#F00'],
            },

            title: {
                text: 'Energian määrä (W)',
                align: 'left'
            },
        }
        const priceChart = new ApexCharts(document.querySelector('#price-chart'), priceOptions);
        const wattChart = new ApexCharts(document.querySelector('#watt-chart'), wattOptions);
        wattChart.render();
        priceChart.render();
    }
}

function EnergySection(props){
    const {property} = useContext(PropertyContext);
    const [showModal, setShowModal] = useState(false);
    const [energyUsage, loadEnergyUsage] = useEnergyUsage(property.id);

    useEffect(() => {
        renderCharts(energyUsage);
    }, [energyUsage]);

    if(!energyUsage) return <Loading message="Ladataan kulutustietoja..."/>

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

                        Upload(`/api/energy_usage/${property.id}`, data, () => {
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
                        <div id="price-chart" className="chart"></div>
                        <div id="watt-chart" className="chart"></div>
                    </Gallery.Body>
                </Gallery>
               
            </Section.Body>
        </Section>
    )
}

export default EnergySection;