'use client';

import { filterIntoObject } from "kotilogi-app/utils/filterIntoObject";
import { PieChart } from "../Experimental/Chart/Chart";
import { ApexOptions } from "apexcharts";

type UsagePieChartProps = {
    data: any[],
}

/**A pie chart displaying the total usage expenses. */
export function UsagePieChart({data}: UsagePieChartProps){
    
    const dataFiltered = filterIntoObject(data, 'type', ['heat', 'water', 'electric']);
    const reduce = (arr) => arr.reduce((acc, cur) => acc += cur.price, 0);

    const chartOptions: ApexOptions = {
        series: [
            reduce(dataFiltered.heat), reduce(dataFiltered.water), reduce(dataFiltered.electric),
        ],
        labels: ['Lämmityskulut', 'Vesikulut', 'Sähkökulut'],
        colors: ['#f00', '#00f', '#ff0']
    }

    return (
        <PieChart options={chartOptions} dataPointColor="#f00"/>
    );
}