import {useContext, useState, useEffect, useRef} from 'react';
import PropertyContext from '../../Contexts/PropertyContext';
import Section from '../../Components/Section';
import Button from '../../Components/Buttons/Button';
import NoUsage from '../../Components/Error/NoUsage';
import ApexCharts from 'apexcharts';
import UploadUsageModal from '../../Components/Modals/UploadUsageModal';
import useUsage from '../../Hooks/useUsage';
import EnergyUsageCard from '../../Components/Cards/EnergyUsageCard';
import Gallery from '../../Components/Gallery';
import Loading from '../Loading';
import Upload from '../../Functions/Upload';

function UsageSection(props){
    const {property} = useContext(PropertyContext);
    const [showModal, setShowModal] = useState(false);
    const [usage, loadUsage] = useUsage(property.id);

    const electricityChart = useRef(null);

    useEffect(() => {
        const electricityOptions = {
            series: [
                {
                    name: 'Hinta',
                    data: [],
                    colors: ['#ff0']
                }
            ],

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
                colors: ['#ff0'],
            },

            title: {
                text: 'Sähkö',
                align: 'left'
            },
        }

        const waterOptions = {
            series: [
                {
                    name: 'Hinta',
                    data: [],
                    colors: ['#00f']
                }
            ],

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
                colors: ['#00f'],
            },

            title: {
                text: 'Vesi',
                align: 'left'
            },
        }

        const heatingOptions = {
            series: [
                {
                    name: 'Hinta',
                    data: [],
                    colors: ['#f00']
                }
            ],

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
                colors: ['#f00'],
            },

            title: {
                text: 'Lämmitys',
                align: 'left'
            },
        }

        const echart = new ApexCharts(document.querySelector('#electricity-chart'), electricityOptions);
        echart.render();

        const wchart = new ApexCharts(document.querySelector('#water-chart'), waterOptions);
        wchart.render();

        const hchart = new ApexCharts(document.querySelector('#heating-chart'), heatingOptions);
        hchart.render();

        if(!usage) return;
        echart.updateSeries([{data: usage.filter(u => u.type === 'electricity').map(d => d.price)}]);
        wchart.updateSeries([{data: usage.filter(u => u.type === 'water').map(d => d.price)}]);
        hchart.updateSeries([{data: usage.filter(u => u.type === 'heating').map(d => d.price)}]);

    }, [usage]);

    if(!usage) return <Loading message="Ladataan kulutustietoja..."/>

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

                <UploadUsageModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    submitHandler={(e) => {
                        e.preventDefault();
                        const data = {
                            time: e.target.time.value,
                            price: e.target.price.valueAsNumber,
                            type: e.target.type.value,
                            property_id: property.id,
                        }

                        Upload(`/api/usage/`, data, () => {
                            loadUsage();
                            setShowModal(false);
                        });
                        //setShowModal(false);
                    }}
                />
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        <div id="electricity-chart" className="chart"></div>
                        <div id="water-chart" className="chart"></div>
                        <div id="heating-chart" className="chart"></div>
                    </Gallery.Body>
                </Gallery>
               
            </Section.Body>
        </Section>
    )
}

export default UsageSection;