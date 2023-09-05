import { throwErrorIfNull } from "kotilogi-app/utils/throwErrorIfNull";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});

export default function HeatingChart(){
    const options: ApexOptions = {
        chart: {
            background: '#fff0',
            zoom: {
                enabled: false,
            }
        },

        colors: ['#f00'],

        title: {
            text: 'Lämmityskulut',
            style: {
                fontFamily: 'Segoe UI'
            }
        },

        yaxis: {

        }
    }

    const dummyData = [1, 2, 5, 4, 3];

    return (
        <>
            <p>
                Näet talosi lämmityskulut tästä.
            </p>
            <Chart
                options={options}
                type="bar"
            
                height="500"
                series={[
                    {
                        name: 'Values',
                        data: dummyData,
                    }
                ]}
            /> 
        </>
        
    )
}