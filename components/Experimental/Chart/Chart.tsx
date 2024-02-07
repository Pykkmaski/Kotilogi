'use client';

import { ApexOptions } from 'apexcharts';
import ApexChart from 'react-apexcharts';
import { isWindowDefined } from 'swr/_internal';

type TakesDataOfType<T> = {
    data: T[],
}

type ChartProps = {
    options: ApexOptions,
    onDataPointSelected?: (index: number) => void,
    dataPointColor: string,
}

function Chart(props: ChartProps){

   if(typeof window === 'undefined') return null;

    const options: ApexOptions = {
        ...props.options,
        colors: [props.dataPointColor],
        chart: {
            ...props.options.chart,
            events: {
                dataPointSelection: function (event, chartContext, config) {
                    props.onDataPointSelected && props.onDataPointSelected(config.dataPointIndex)
                  }
            }
        }
    }
    return (
       <ApexChart options={options} series={options.series} type={options.chart?.type}/>
    );
}

function ColumnChart(props: ChartProps){
    const options: ApexOptions = {
        ...props.options,
        chart: {
            ...props.options.chart,
            type: 'bar',
        },

        plotOptions:{
            ...props.options.plotOptions,
            bar: {
                dataLabels: {
                    position: 'center',
                    orientation: 'vertical',
                },
            }
        },
    }

    return (
        <Chart {...props} options={options}/>
    );
}

export function PieChart(props: ChartProps){
    const options: ApexOptions = {
        ...props.options,
        chart: {
            type: 'pie',
        }
    }

    return (
        <Chart {...props} options={options} />
    )
}

type UsageColumnChartProps = ChartProps & TakesDataOfType<Kotilogi.UsageType>;

export function UsageColumnChart(props: UsageColumnChartProps){

    const options: ApexOptions = {
        ...props.options,

        xaxis: {
            ...props.options.xaxis,
            title:{
                text: 'Päivämäärä',
                style: {
                    color: '#000',
                }
            },
    
            labels: {
                style: {
                    colors:['#000'],
                }
            },

            categories: props.data.map(d => new Date(d.time).toLocaleDateString('fi-FI'))
        },

        yaxis: {
            show: true,
            title: {
                text: 'Hinta',
                style: {
                    color: '#000',
                    fontSize: '1.5rem'
                } 
            },
            labels: {
                style: {
                    colors: ['#000']
                },
                formatter: (value) => `${value} €`,
            },
        },

        dataLabels:{
            enabled: true,
            formatter: (val, opts) => val + ' €',
            style: {
                fontSize: '1.1rem',
            }
        },

        series: [
            {
                name: 'data',
                data: props.data.map(d => d.price),
            }
        ],
    }

    return (
        <ColumnChart {...props} options={options}/>
    );
}



