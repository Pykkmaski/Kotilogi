import { ApexOptions } from "apexcharts";
import { filterIntoObject } from "kotilogi-app/utils/filterIntoObject";
import { Chart, ColumnChart, UsageColumnChart } from "../Experimental/Chart/Chart";
import { colors } from "kotilogi-app/apex.config";

type AllUsageDataChartProps = {
    data: Kotilogi.UsageType[],
}

export function AllUsageDataChart({data}: AllUsageDataChartProps){
    const dataFiltered = filterIntoObject(data, 'type', ['water', 'heat', 'electric']);
    const options: ApexOptions = {
        chart: {
            type: 'bar',
        },

        series: dataFiltered.heat.map(d => d.price),

        xaxis: {
            title:{
                text: 'Aika'
            }
        }
        
    }
    return <Chart options={options}/>
}