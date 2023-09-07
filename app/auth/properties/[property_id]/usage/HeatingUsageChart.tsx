import { ApexOptions } from "apexcharts";
import ChartBase from "./ChartBase";
import generateDummyData from "kotilogi-app/utils/generateDummyData";
import { ChartProps } from "./ChartProps";
import { UsageType } from "kotilogi-app/types/UsageType";

export default function HeatingUsageChart(props: ChartProps){
    const options: ApexOptions = {
        chart: {
            background: '#f001',
        },

        colors: ['#f00'],

        title: {
            text: 'Lämmityskulut',
        },
    }

    return (
        <ChartBase
            options={options}
            series={
                [
                    {
                        name: 'Hinta',
                        data: props.data.map(item => item.price)
                    }
                ]
            }
            rawdata={props.data}
            type={props.type}
        />
    )
}