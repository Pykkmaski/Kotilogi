'use client';

import Spinner from "kotilogi-app/components/Spinner/Spinner";
import { useGalleryContext } from "../GalleryBase/Gallery";
import ChartBase from "./ChartBase";
import { ChartProps } from "./ChartProps";

export default function Chart(props: {
    type: string,
    title: string,
}){
    const color = props.type === 'heat' ? '#f00' : props.type === 'water' ? '#00f' : '#ff0';
    const {data} = useGalleryContext();
    
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
                    data: data.map((item: any) => item.price)
                }
            ]}
            rawdata={data as any}
        />
    )
}