import ChartBase from "./ChartBase";
import { ChartProps } from "./ChartProps";

export default function ElectricalUsageChart(props: ChartProps){
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
                    data: props.data.map(item => item.price)
                }
            ]}
            rawdata={props.data}
        />
    )
}