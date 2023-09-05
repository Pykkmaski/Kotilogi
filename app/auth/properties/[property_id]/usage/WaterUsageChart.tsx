import generateDummyData from 'kotilogi-app/utils/generateDummyData';
import ChartBase from './ChartBase';

export default function WaterUsageChart(){

    const options = {
        colors: ['#00f'],

        chart: {
            background: '#00f1',
        },

        title: {
            text: 'Vedenkäyttökulut',
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