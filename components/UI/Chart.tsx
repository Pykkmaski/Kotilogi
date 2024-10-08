'use client';

import { ApexOptions } from 'apexcharts';
import { mergeByMonth } from 'kotilogi-app/actions/usage.utils';
import { UtilityDataType } from 'kotilogi-app/dataAccess/types';
import ApexChart from 'react-apexcharts';

type TakesDataOfType<T> = {
  data: T[];
};

type ChartProps = {
  options: ApexOptions;
  onDataPointSelected?: (index: number) => void;
  dataPointColor?: string;
};

export function Chart(props: ChartProps) {
  const options: ApexOptions = {
    ...props.options,
    chart: {
      ...props.options.chart,

      events: {
        dataPointSelection: function (event, chartContext, config) {
          props.onDataPointSelected && props.onDataPointSelected(config.dataPointIndex);
        },
      },
    },
  };

  return (
    <ApexChart
      options={options}
      series={options.series}
      type={options.chart?.type}
    />
  );
}

export function ColumnChart(props: ChartProps) {
  const options: ApexOptions = {
    ...props.options,
    chart: {
      ...props.options.chart,
      type: 'bar',
    },

    plotOptions: {
      ...props.options.plotOptions,
      bar: {
        dataLabels: {
          position: 'center',
          orientation: 'vertical',
        },
      },
    },
  };

  return (
    <Chart
      {...props}
      options={options}
    />
  );
}

export function PieChart(props: ChartProps) {
  const options: ApexOptions = {
    ...props.options,
    chart: {
      type: 'donut',
    },
  };

  return (
    <Chart
      {...props}
      options={options}
    />
  );
}

type UsageColumnChartProps = ChartProps &
  TakesDataOfType<UtilityDataType> & {
    columnColor: string;
  };

export function UsageColumnChart(props: UsageColumnChartProps) {
  const data = mergeByMonth(props.data);
  console.log(data);

  const options: ApexOptions = {
    ...props.options,
    xaxis: {
      ...props.options.xaxis,
      title: {
        text: 'Kuukausi',
        style: {
          color: '#000',
        },
      },

      labels: {
        style: {
          colors: ['#000'],
        },
      },

      categories: data.map((d, index) => index + 1),
    },

    yaxis: {
      show: true,
      title: {
        text: 'Hinta',
        style: {
          color: '#000',
          fontSize: '1.2rem',
        },
      },
      labels: {
        style: {
          colors: ['#000'],
        },
        formatter: value => `${value} €`,
      },
    },

    dataLabels: {
      enabled: true,
      formatter: (val, opts) => val + ' €',
      style: {
        fontSize: '1.1rem',
      },
    },

    series: [
      {
        name: 'data',
        data: data.map(d => (d ? d / 100 : d)),
      },
    ],

    colors: [props.columnColor],
  };

  return (
    <ColumnChart
      {...props}
      options={options}
    />
  );
}
