'use client';

import { PieChart } from "../Experimental/Chart/Chart";
import { ApexOptions } from "apexcharts";

type UsagePieChartProps = {
    data: any[],
}

/**A pie chart displaying the total usage expenses. */
export function UsagePieChart({data}: UsagePieChartProps){
    
    const electricData = data.filter(d => d.type === 'electric');
    const heatingData = data.filter(d => d.type === 'heat');
    const waterData = data.filter(d => d.type === 'water');

    const reduce = (arr) => arr.reduce((acc, cur) => acc += cur.price, 0);

    const chartOptions: ApexOptions = {
        series: [
            reduce(heatingData), reduce(waterData), reduce(electricData),
        ],
        labels: ['Lämmityskulut', 'Vesikulut', 'Sähkökulut'],
        colors: ['#f00', '#00f', '#0ff']
    }

    return (
        <PieChart options={chartOptions} dataPointColor="#f00"/>
    );
}