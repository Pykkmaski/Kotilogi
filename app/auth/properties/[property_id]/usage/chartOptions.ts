import { ApexOptions } from "apexcharts";

export const options: ApexOptions = {
    chart: {
        background: '#ffff',
        zoom: {
            enabled: false,
        }, 
    },

    dataLabels:{
        enabled: true,
        formatter: (val, opts) => val + ' €',
        style: {
            fontSize: '1.1rem',
        }
    },

    plotOptions:{
        bar: {
            dataLabels: {
                position: 'top',
                orientation: 'vertical',
            }
        }
    },

    title: {
        style: {
            fontFamily: 'Segoe UI',
            color: 'white',
        }
    },

    yaxis: {
        show: true,
        title: {
            text: 'Euroa',
            style: {
                color: 'white',
                fontSize: '1rem'
            } 
        },
        labels: {
            style: {
                colors: ['white']
            }
        }
    },
    xaxis: {
        title:{
            text: 'Päivämäärä',
            style: {
                color: 'white',
            }
        },

        labels: {
            style: {
                colors:['white'],
            }
        }

    }
}