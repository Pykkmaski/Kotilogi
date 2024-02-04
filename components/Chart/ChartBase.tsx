"use client";

import { ApexOptions } from "apexcharts"
import {options as chartOptions, textColor} from './chartOptions';
import Chart from 'react-apexcharts';

//const Chart = dynamic(() => import('react-apexcharts'));

type ChartBaseProps = {
    options: ApexOptions,
    series: any,
    rawdata: Kotilogi.UsageType[],
}

export default function ChartBase(props: ChartBaseProps){
    if(!window) return null;

    const categories: string[] = props.rawdata.map((item: Kotilogi.UsageType) => {
        return new Date(item.time).toLocaleDateString('fi-FI');
    });

    const options: ApexOptions = {
        ...chartOptions,
        ...props.options,

        chart: {
            background: '#0000',
            ...props.options.chart,
        },

        title: {
            ...chartOptions.title,
            ...props.options.title,
        },

        noData: {
            ...chartOptions.noData,
            text: 'Ei tietoja',
            align: 'center',
            style: {
                color: textColor,
            }
        },

        xaxis: {
            ...chartOptions.xaxis,
           categories,
           labels: {
            style:{
                colors: textColor,
            }
           }
        },

        
    };

    return (
        <div style={{
            borderRadius: '5px',
            overflow: 'hidden'
        }}>
            <Chart
                type={'bar'}
                height="500"
                width="100%"
                options={options}
                series={props.series}
            /> 
        </div>
        
    );
}