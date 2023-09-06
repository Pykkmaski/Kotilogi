import generateDummyData from "kotilogi-app/utils/generateDummyData";
import ChartBase from "./ChartBase";
import { ChartProps } from "./ChartProps";

export default function ElectricalUsageChart({data}: ChartProps){
    const options = {
        colors: ['#ff0'],
        chart: {
            background: '#ff01',
        },

        title:{
            text: 'Sähkönkäyttökulut'
        }
    }

    return (
        <ChartBase
            options={options}
            series={[
                {
                    name: 'Values',
                    data: data.map(item => item.price)
                }
            ]}
            rawdata={data}
        />
    )
}