import generateDummyData from 'kotilogi-app/utils/generateDummyData';
import ChartBase from './ChartBase';
import { ChartProps } from './ChartProps';

export default function WaterUsageChart(props: ChartProps){

    const options = {
        colors: ['#00f'],

        chart: {
            background: '#00f1',
        },

        title: {
            text: 'Vedenkäyttökulut',
        }

    }

    return (
        <ChartBase
            options={options}
            series={[
                {
                    name: 'Hinta',
                    data: props.data.map(item => item.price)
                }
            ]}
            rawdata={props.data}
            type={props.type}
        />  

    )
}