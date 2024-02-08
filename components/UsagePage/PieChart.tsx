import db from "kotilogi-app/dbconfig";
import { PieChart } from "../Experimental/Chart/Chart";
import { ApexOptions } from "apexcharts";

type UsagePieChartProps = {
    propertyId: string,
}

/**A pie chart displaying the total usage expenses. */
export async function UsagePieChart({propertyId}: UsagePieChartProps){
    const usageData = await db('usage').where({refId: propertyId});
    
    const chartOptions: ApexOptions = {
        series: [
            {
                name: 'data',
                data: usageData.map(d => d.price),
            }
        ],
    }

    return (
        <PieChart options={chartOptions} dataPointColor="#f00"/>
    );
}