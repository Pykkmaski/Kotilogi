'use client';

import { useGalleryContext } from "../GalleryBase/Gallery";
import ChartBase from "./ChartBase";
import { ChartProps } from "./ChartProps";

export default function Chart(props: {
    type: string,
    title: string,
}){
    const color = props.type === 'heat' ? '#f00' : props.type === 'water' ? '#00f' : '#ff0';
    const {state} = useGalleryContext();
    
    const options = {
        colors: [color],
        chart: {
            background: '#ff01',
        },

        title:{
            text: props.title
        }
    }

    return (
        <ChartBase
            options={options}
            series={[
                {
                    name: 'Values',
                    data: state.data.map(item => item.price)
                }
            ]}
            rawdata={state.data}
        />
    )
}