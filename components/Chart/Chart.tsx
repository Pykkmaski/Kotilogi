'use client';

import Spinner from 'kotilogi-app/components/Spinner/Spinner';
import ChartBase from './ChartBase';
import { ChartProps } from './ChartProps';

export default function Chart(props: { type: string; title: string; data: any; onDataPointSelected?: (dataPoint: any) => void }) {
  const color = props.type === 'heat' ? '#f00' : props.type === 'water' ? '#00f' : '#ff0';

  const options = {
    colors: [color],
    chart: {
      background: '#ff01',
      events: {
        dataPointSelection: function (event, chartContext, config) {
          props.onDataPointSelected && props.onDataPointSelected(config.dataPointIndex);
        },
      },
    },

    title: {
      text: props.title,
    },
  };

  return (
    <ChartBase
      options={options}
      series={[
        {
          name: 'Values',
          data: props.data.map((item: any) => item.price),
        },
      ]}
      rawdata={props.data as any}
    />
  );
}
