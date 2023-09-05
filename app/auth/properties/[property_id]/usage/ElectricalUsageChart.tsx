import generateDummyData from "kotilogi-app/utils/generateDummyData";
import ChartBase from "./ChartBase";

export default function ElectricalUsageChart(){
    const options = {
        colors: ['#ff0'],
        chart: {
            background: '#ff01',
        },

        title:{
            text: 'Sähkönkäyttökulut'
        }
    }

    const dummyData = generateDummyData(1, 0.1, 12);

    return (
        <ChartBase
            options={options}
            series={[
                {
                    name: 'Values',
                    data: dummyData,
                }
            ]}
        />
    )
}