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
            text: '€',
            style: {
                color: 'white',
                fontSize: '2rem'
            } 
        },
        labels: {
            style: {
                colors: ['#ffff']
            }
        }
    },
    xaxis: {
        type: 'category',
        categories: [1, 2 ,3],

    }
}