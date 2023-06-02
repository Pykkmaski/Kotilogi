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

    const dataLabelFormatter = (value, {seriesIndex, dataPointIndex, w}) => value + '€';

    const toolbar = {
        show: true,

        tools: {
            download: true,
            zoom: true,
            pan: true,
        }
    }

    const chart = {
        height: 350,
        width: 850,
        toolbar,
        zoom: {
          enabled: true
        }
    };

    const yaxis = {
        title: {
            text: undefined,
            rotate: 0,
            offsetX: -5,
            style: {
                fontSize: '1.5rem'
            }
        },
    }

    const noData = {
        text: 'Ei tietoja.'
    };

    const dataLabelStyle = {
        fontWeight: 300,
    }
    

    const tooltip = {
        enabled: false,
    }

    const processDate = (d) => {
        const type = typeof(d.time);
        return type === 'string' ? parseInt(d.time) : d.time;
    }

    function getCategories(usageFilter){
        return usage?.filter(u => u.type === usageFilter).map(d => {
            const time = processDate(d);
            return new Date(time).toLocaleDateString('fi-FI')
        });
    }

    const electricityOptions = {
        xaxis: {
            categories: getCategories('electricity'),
            labels:{
                colors: ['#000'],
            },
        },

        noData,
        tooltip,
        chart,
        yaxis,

        dataLabels:{
            style:{
                colors: ['#000'],
                fontSize: '14px',
            },

            formatter: dataLabelFormatter,
        },

        fill:{
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
        chart,
        tooltip,
        yaxis,

        dataLabels: {
            formatter: dataLabelFormatter,
        },

        xaxis: {
            categories: getCategories('water')
        },

        fill:{
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
        chart,
        tooltip,
        yaxis,

        dataLabels: {
            formatter: dataLabelFormatter,
        },

        xaxis: {
            categories: getCategories('heating')
        },

        fill: {
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