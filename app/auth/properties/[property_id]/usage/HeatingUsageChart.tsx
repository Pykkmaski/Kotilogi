import { ApexOptions } from "apexcharts";
import ChartBase from "./ChartBase";
import generateDummyData from "kotilogi-app/utils/generateDummyData";

export default function HeatingUsageChart(){
    const options: ApexOptions = {
        chart: {
            background: '#f001',
        },

        colors: ['#f00'],

        title: {
            text: 'Lämmityskulut',
        },
    }

    const dummyData = generateDummyData(1, 0.1, 12);

    return (
        <ChartBase
            options={options}
            series={
                [
                    {
                        name: 'Values',
                        data: dummyData,
                    }
                ]
            }
        />
    )
}