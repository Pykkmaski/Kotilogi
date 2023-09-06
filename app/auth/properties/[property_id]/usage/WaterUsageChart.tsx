import generateDummyData from 'kotilogi-app/utils/generateDummyData';
import ChartBase from './ChartBase';
import { ChartProps } from './ChartProps';

export default function WaterUsageChart({data}: ChartProps){

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
                    data: data.map(item => item.price)
                }
            ]}
            rawdata={data}
        />  

    )
}