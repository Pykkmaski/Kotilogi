'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useUtilityProviderContext } from './UtilityContext';
import { aggregate, aggregateToMonths, aggregateToYears } from './aggregateData';
import colors from 'kotilogi-app/colors';
import { BlankChart } from '@/components/New/BlankChart';
import { filterUtilityDataByOptions } from './_util/filterUtilityDataByOptions';
import { timeStamp } from 'console';
import { useCallback, useMemo } from 'react';

export function UtilityLineChart() {
  const { data, selectedTypes, allTypes, year } = useUtilityProviderContext();

  /*
  const aggregatedData =
    year !== null
      ? aggregateToMonths(data)
      : aggregateToYears(data).reduce((acc, cur) => {
          const data = [...acc, ...cur.data];
          return data;
        }, []);
  */
  const aggregatedData = useMemo(() => aggregate(data), [data, year]);

  const dataToDisplay = useMemo(() => {
    return year !== null
      ? aggregatedData.get(parseInt(year))
      : Array.from(aggregatedData.entries())
          .sort((a, b) => a[0] - b[0])
          .map(([key, value]) => value)
          .flat(1);
  }, [aggregatedData, year]);

  const getColor = useCallback((typeLabel: string) => {
    return typeLabel == 'Lämmitys'
      ? colors.heat
      : typeLabel == 'Vesi'
      ? colors.water
      : typeLabel == 'Sähkö'
      ? colors.electric
      : 'gray';
  }, []);

  const getLine = useCallback((typeLabel: string, key: string) => {
    return (
      <Area
        animationDuration={100}
        key={key}
        type='monotone'
        dataKey={typeLabel}
        stroke={getColor(typeLabel)}
        connectNulls={true}
        strokeWidth={2}
        fill={`url(#color-${typeLabel})`}
        fillOpacity={1}
      />
    );
  }, []);

  const gradientStopOpacity = 0.3;

  return (
    <ResponsiveContainer
      width='100%'
      height={300}>
      {data.length > 0 ? (
        <AreaChart data={dataToDisplay}>
          <defs>
            <linearGradient
              id='color-Sähkö'
              x1='0'
              y1='0'
              x2='0'
              y2='1'>
              <stop
                offset='5%'
                stopColor={colors.electric}
                stopOpacity={gradientStopOpacity}
              />
              <stop
                offset='95%'
                stopColor={colors.electric}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient
              id='color-Vesi'
              x1='0'
              y1='0'
              x2='0'
              y2='1'>
              <stop
                offset='5%'
                stopColor={colors.water}
                stopOpacity={gradientStopOpacity}
              />
              <stop
                offset='95%'
                stopColor={colors.water}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient
              id='color-Lämmitys'
              x1='0'
              y1='0'
              x2='0'
              y2='1'>
              <stop
                offset='5%'
                stopColor={colors.heat}
                stopOpacity={gradientStopOpacity}
              />
              <stop
                offset='95%'
                stopColor={colors.heat}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray={'3 3'} />
          <Tooltip
            labelFormatter={month => {
              const date = new Date();
              date.setMonth(month);
              return date.toLocaleDateString('fi', { month: 'long' });
            }}
          />

          <XAxis
            dataKey='month'
            tickFormatter={month => {
              const date = new Date();
              date.setMonth(month);

              return date.toLocaleDateString('fi', { month: 'long' });
            }}
          />

          <YAxis
            dataKey={'total'}
            tickFormatter={tick => `${tick}€`}
          />

          {(selectedTypes.length &&
            selectedTypes.map((type, i) => getLine(type, `bar-${type}-${i}`))) ||
            allTypes.map((val, i) => getLine(val, `bar-${val}-${i}`))}
        </AreaChart>
      ) : (
        <BlankChart
          variant='bar'
          dummyLen={12}
          width={'100%'}
          height={300}
        />
      )}
    </ResponsiveContainer>
  );
}
