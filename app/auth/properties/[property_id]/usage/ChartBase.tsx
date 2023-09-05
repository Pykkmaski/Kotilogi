"use client";

import { ApexOptions } from "apexcharts"
import dynamic from 'next/dynamic';
import {options as chartOptions} from './chartOptions';

const Chart = dynamic(() => import('react-apexcharts'));

type ChartBaseProps = {
    options: ApexOptions,
    series: {name: string, data: any[]}[],
}

export default function ChartBase(props: ChartBaseProps){

    const options = {
        ...chartOptions,
        ...props.options,

        title: {
            ...chartOptions.title,
            ...props.options.title,
        }
    };

    return (
        <Chart
            type="bar"
            height="500"
            options={options}
            series={props.series}
        /> 
    );
}