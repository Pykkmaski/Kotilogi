"use client";

import { ApexOptions } from "apexcharts"
import dynamic from 'next/dynamic';
import {options as chartOptions} from './chartOptions';
import { UsageType } from "kotilogi-app/types/UsageType";
import { ChartDatapointType } from "./ChartDatapointType";

const Chart = dynamic(() => import('react-apexcharts'));

type ChartBaseProps = {
    options: ApexOptions,
    series: any,
    type: ChartDatapointType,
    rawdata: UsageType[],
}

export default function ChartBase(props: ChartBaseProps){

    const dateCategories = props.rawdata.map((item, index: number) => new Date(item.time).toLocaleDateString('fi-FI'));

    const options: ApexOptions = {
        ...chartOptions,
        ...props.options,

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
            categories: dateCategories,
        },

        tooltip: {
            theme: 'dark',
        }
    };

    console.log(dateCategories);

    return (
        <Chart
            type={props.type}
            height="500"
            options={options}
            series={props.series}
        /> 
    );
}