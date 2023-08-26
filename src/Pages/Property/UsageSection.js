import {useContext, useState, useEffect, useRef} from 'react';
import PropertyContext from '../../Contexts/PropertyContext';
import Section from '../../Components/Section';
import Button from '../../Components/Buttons/Button';
import NoUsage from '../../Components/Error/NoUsage';
import ApexCharts from 'apexcharts';
import UploadUsageModal from '../../Components/Modals/UploadUsageModal';
import useUsage from '../../Hooks/useUsage';
import EnergyUsageCard from '../../Components/Cards/EnergyUsageCard';
import Gallery from '../../Components/Gallery/Gallery';
import Loading from '../Loading';
import Upload from '../../Functions/Upload';
import Chart from 'react-apexcharts';

function UsageSection(props){
    const {property} = useContext(PropertyContext);
    const [showModal, setShowModal] = useState(false);
    const [usage, loadUsage] = useUsage(property.id);

    const toolbar = {
        show: true,

        tools: {
            download: true,
            zoom: true,
            pan: true,
        }
    }

    const dataPointSelection = (event, chartContext, config) => {
        console.log(config.w.config.series[0]);
        //console.log(config.w.config.series.data[config.dataPointIndex]);
    }

  

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
                    <small>Kulutus</small>
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
                    <Gallery.Body className="empty">
                        <div id="charts">
                            <Chart
                                type={chartType}
                                series={[{
                                    name: 'Hinta',
                                    data: usage.filter(u => u.type === 'electricity').map(d => d.price),
                                    colors: ['#f00'],
                                }]}
                                
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