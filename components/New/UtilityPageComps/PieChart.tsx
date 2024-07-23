'use client';

import { filterIntoObject } from 'kotilogi-app/utils/array';
import { ApexOptions } from 'apexcharts';
import { colors } from 'kotilogi-app/apex.config';
import { UtilityType } from 'kotilogi-app/models/enums/UtilityType';
import { UtilityDataType } from 'kotilogi-app/models/types';
import { PieChart } from '@/components/UI/Chart';

type UsagePieChartProps = {
  data: UtilityDataType[];
};

/**A pie chart displaying the total usage expenses. */
export function UsagePieChart({ data }: UsagePieChartProps) {
  const dataFiltered = filterIntoObject(data, 'type', [
    UtilityType.HEAT,
    UtilityType.WATER,
    UtilityType.ELECTRIC,
  ]);

  const reduce = (arr: UtilityDataType[]) =>
    arr.reduce((acc, cur) => (acc += cur.monetaryAmount), 0) / 100;

  const chartOptions: ApexOptions = {
    series: [
      reduce(dataFiltered[UtilityType.HEAT]),
      reduce(dataFiltered[UtilityType.WATER]),
      reduce(dataFiltered[UtilityType.ELECTRIC]),
    ],
    labels: ['Lämmityskulut', 'Vesikulut', 'Sähkökulut'],
    colors: [colors.heat, colors.water, colors.electric],
    legend: {
      show: false,
    },
  };

  return (
    <PieChart
      options={chartOptions}
      dataPointColor='#f00'
    />
  );
}
