'use client';

import { ApexOptions } from "apexcharts";
import { filterIntoObject } from "kotilogi-app/utils/filterIntoObject";
import { Chart, ColumnChart, UsageColumnChart } from "../Experimental/Chart/Chart";
import { colors } from "kotilogi-app/apex.config";
import ApexChart from "react-apexcharts";

type AllUsageDataChartProps = {
    data: Kotilogi.UsageType[],
}

export function AllUsageDataChart({data}: AllUsageDataChartProps){
    const dataFiltered = filterIntoObject(data, 'type', ['heat', 'water', 'electric']);

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            height: 500,
        },

        xaxis: {
            title: {
                text: 'Päiväys',
            }
        },

        yaxis: {
            title: {
                text: 'Hinta (€)'
            }
        },

        series: Object.keys(dataFiltered).map(key => {
            const data = dataFiltered[key].map(d => d.price);
            data.unshift(0);

            return {
                name: key,
                data,
                color: colors[key],
            }
        }),
    }

    return (
        <div className="w-[700px] object-contain">
            <ApexChart options={options} series={options.series}/>
        </div>
        
    )
        
}