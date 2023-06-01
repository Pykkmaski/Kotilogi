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
import Chart from 'react-apexcharts';

function UsageSection(props){
    const {property} = useContext(PropertyContext);
    const [showModal, setShowModal] = useState(false);
    const [usage, loadUsage] = useUsage(property.id);

    const chartType = 'bar';

    const globalFormatter = (value, {seriesIndex, dataPointIndex, w}) => value + '€';

    const chart = {
        height: 350,
        width: 850,
        zoom: {
          enabled: true
        }
    };

    const noData = {
        text: 'Ei tietoja'
    };

    const electricityOptions = {
        xaxis: {
            categories: usage?.filter(u => u.type === 'electricity').map(d => new Date(d.time).toLocaleDateString('fi')),
        },

        noData,

        dataLabels:{
            style:{
                colors: ['#000'],
                fontSize: '14px',
            },

            formatter: globalFormatter,
        },

        fill:{
            colors: ['#ff0'],
        },

        labels:{
            colors: ['#000']
        },

        chart,

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
                type: 'line',
                name: 'Hinta',
                data: [],
                colors: ['#00f']
            },

            {
                type: 'column',
                data: [],
                colors: ['#00f']
            }
        ],

        noData,

        dataLabels: {
            formatter: globalFormatter,
        },

        xaxis: {
            categories: usage?.filter(u => u.type === 'electricity').map(d => new Date(d.time).toLocaleDateString('fi')),
        },

        fill:{
            colors: ['#00f'],
        },

       chart,

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
                type: 'line',
                name: 'Hinta',
                data: [],
                colors: ['#f00']
            },

            {
                type: 'column',
                data: [],
                colors: ['#ff0']
            }
        ],

        noData,

        dataLabels: {
            formatter: globalFormatter,
        },

        xaxis: {
            categories: usage?.filter(u => u.type === 'electricity').map(d => new Date(d.time).toLocaleDateString('fi')),
        },

        fill: {
            colors: ['#f00'],
        },

        chart,

        stroke: {
            curve: 'straight',
            colors: ['#f00'],
        },

        title: {
            text: 'Lämpö',
            align: 'left'
        },
    }

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
                        e.target.submit_button.disabled = true;

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

                        e.target.submit_button.disabled = false;
                        
                        //setShowModal(false);
                    }}
                />
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        <div id="charts">
                            <Chart
                                type={chartType}
                                series={[{
                                    name: 'Hinta',
                                    data: usage.filter(u => u.type === 'electricity').map(d => d.price),
                                    colors: ['#f00'],
                                }]}
                                width="800"
                                height="350"
                                options={electricityOptions}
                            />

                            <Chart
                                type={chartType}
                                series={[{ 
                                    name: 'Hinta',
                                    data: usage.filter(u => u.type === 'water').map(d => d.price)
                                }]}
                                width="800"
                                height="350"
                                options={waterOptions}
                            />

                            <Chart
                                type={chartType}
                                series={[{ 
                                    name: 'Hinta',
                                    data: usage.filter(u => u.type === 'heating').map(d => d.price)
                                }]}
                                width="800"
                                height="350"
                                options={heatingOptions}
                            />
                        </div>
                    </Gallery.Body>
                </Gallery>
               
            </Section.Body>
        </Section>
    )
}

export default UsageSection;