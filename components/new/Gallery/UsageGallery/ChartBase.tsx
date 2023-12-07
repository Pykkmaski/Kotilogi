"use client";

import { ApexOptions } from "apexcharts"
import dynamic from 'next/dynamic';
import {options as chartOptions, textColor} from './chartOptions';
import stringToDate from "kotilogi-app/utils/stringToDate";
import locale from "kotilogi-app/locale.config";

const Chart = dynamic(() => import('react-apexcharts'));

type ChartBaseProps = {
    options: ApexOptions,
    series: any,
    rawdata: Kotilogi.UsageType[],
}

export default function ChartBase(props: ChartBaseProps){

    const categories: string[] = props.rawdata.map((item: Kotilogi.UsageType) => {
        return new Date(item.time).toLocaleDateString('fi-FI');
    });

    const options: ApexOptions = {
        ...chartOptions,
        ...props.options,

        chart: {
            background: '#0000',
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

        tooltip: {
            theme: 'dark',
        }
    };

    return (
        <div style={{
            borderRadius: '5px',
            overflow: 'hidden'
        }}>
            <Chart
                type={'bar'}
                height="500"
                options={options}
                series={props.series}
            /> 
        </div>
        
    );
}