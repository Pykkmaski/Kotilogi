import { ApexOptions } from "apexcharts";

export const options: ApexOptions = {
    chart: {
        background: '#ffff',
        zoom: {
            enabled: false,
        }, 
        toolbar: {
            show: false,
        }
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
            },
            borderRadius: 5
        }
    },

    title: {
        style: {
            fontFamily: 'Segoe UI',
            color: 'white',
            fontSize: '20px',
        }
    },

    yaxis: {
        show: true,
        title: {
            text: 'Hinta',
            style: {
                color: 'white',
                fontSize: '1.5rem'
            } 
        },
        labels: {
            style: {
                colors: ['white']
            },
            formatter: (value) => `${value} €`,
        },
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