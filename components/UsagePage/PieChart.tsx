'use client';

import { filterIntoObject } from 'kotilogi-app/utils/array';
import { PieChart } from '../Experimental/Chart/Chart';
import { ApexOptions } from 'apexcharts';
import { colors } from 'kotilogi-app/apex.config';

type UsagePieChartProps = {
  data: Kotidok.UsageType[];
};

/**A pie chart displaying the total usage expenses. */
export function UsagePieChart({ data }: UsagePieChartProps) {
  const dataFiltered = filterIntoObject(data, 'type', ['heat', 'water', 'electric']);

  const reduce = (arr: Kotidok.UsageType[]) => arr.reduce((acc, cur) => (acc += cur.price), 0);

  const chartOptions: ApexOptions = {
    series: [reduce(dataFiltered.heat), reduce(dataFiltered.water), reduce(dataFiltered.electric)],
    labels: ['Lämmityskulut', 'Vesikulut', 'Sähkökulut'],
    colors: [colors.heat, colors.water, colors.electric],
    legend: {
      show: false,
    },
  };

  return <PieChart options={chartOptions} dataPointColor='#f00' />;
}
