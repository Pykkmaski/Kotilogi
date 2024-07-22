import { getUtilityTypeLabel, UtilityType } from 'kotilogi-app/models/enums/UtilityType';
import { UtilityDataType } from 'kotilogi-app/models/types';
import { filterIntoObject } from 'kotilogi-app/utils/array';

const Label = ({ children }: React.PropsWithChildren) => (
  <div className='text-lg font-semibold'>{children}</div>
);

const Item = ({ children }: React.PropsWithChildren) => (
  <div className='flex gap-8 items-center justify-between'>{children}</div>
);

const Total = ({ data, units }: { data: UtilityDataType[]; units: 'L' | 'kWh' | 'mWh' }) => {
  const total = data.map(d => d.monetaryAmount / 100).reduce((acc, cur) => acc + cur, 0);
  const totalUnits = data.map(d => d.unitAmount / 100).reduce((acc, cur) => acc + cur, 0);

  return (
    <span>
      {total.toFixed(2)}€, {totalUnits.toFixed(2)}
      {units}
    </span>
  );
};

type UsageDataCategorizedProps = {
  data: UtilityDataType[];
};

export function UsageDataCategorized({ data }: UsageDataCategorizedProps) {
  const dataFiltered = filterIntoObject(data, 'type', [
    UtilityType.WATER,
    UtilityType.HEAT,
    UtilityType.ELECTRIC,
  ]);

  return (
    <div className='flex flex-col gap-4 text-slate-500'>
      {Object.keys(dataFiltered).map(key => {
        const displayKey =
          key == UtilityType.HEAT.toString()
            ? 'Lämmitys'
            : key == UtilityType.WATER.toString()
            ? 'Vesi'
            : 'Sähkö';

        const units =
          key == getUtilityTypeLabel(UtilityType.HEAT)
            ? 'mWh'
            : key == getUtilityTypeLabel(UtilityType.WATER)
            ? 'L'
            : 'kWh';

        return (
          <Item>
            <Label>{displayKey}:</Label>
            <Total
              data={dataFiltered[key]}
              units={units}
            />
          </Item>
        );
      })}
    </div>
  );
}
