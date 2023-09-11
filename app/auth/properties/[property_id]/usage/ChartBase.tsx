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
    rawdata: UsageType[],
}

export default function ChartBase(props: ChartBaseProps){

    const categories: string[] = props.rawdata.map((item: UsageType) => {
        return new Date(item.time).toLocaleDateString('fi');
    });

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
           categories,
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