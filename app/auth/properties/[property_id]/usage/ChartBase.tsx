"use client";

import { ApexOptions } from "apexcharts"
import dynamic from 'next/dynamic';
import {options as chartOptions} from './chartOptions';

const Chart = dynamic(() => import('react-apexcharts'));

type ChartBaseProps = {
    options: ApexOptions,
    series: any,
    rawdata: Kotilogi.UsageType[],
}

export default function ChartBase(props: ChartBaseProps){

    const categories: string[] = props.rawdata.map((item: Kotilogi.UsageType) => {
        return new Date(item.time).toLocaleDateString('fi');
    });

    const options: ApexOptions = {
        ...chartOptions,
        ...props.options,

        chart: {
            background: '#0006',
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
                color: 'white',
            }
        },

        xaxis: {
            ...chartOptions.xaxis,
           categories,
           labels: {
            style:{
                colors: 'white'
            }
           }
        },

        tooltip: {
            theme: 'dark',
        }
    };

    return (
        <Chart
            type={'bar'}
            height="500"
            options={options}
            series={props.series}
        /> 
    );
}