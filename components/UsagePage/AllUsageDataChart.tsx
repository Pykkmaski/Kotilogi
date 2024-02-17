'use client';

import { ApexOptions } from "apexcharts";
import { filterIntoObject } from "kotilogi-app/utils/array";
import { Chart, ColumnChart, UsageColumnChart } from "../Experimental/Chart/Chart";
import { colors } from "kotilogi-app/apex.config";
import ApexChart from "react-apexcharts";
import { mergeByMonth } from "kotilogi-app/actions/usage.utils";

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

        plotOptions:{
            bar: {
                dataLabels: {
                    position: 'center',
                    orientation: 'vertical',
                },
            }
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
            const data = mergeByMonth(dataFiltered[key], true).map(d => parseFloat(d.toFixed(2)))
            //data.unshift(0);

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